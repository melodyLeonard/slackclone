import { PubSub, withFilter } from "graphql-subscriptions";
import { requireAuth } from "../permissions";

const pubsub = new PubSub();

const NEW_CHANNEL_MESSAGE = "NEW_CHANNEL_MESSAGE";

export default {
  Subscription: {
    newChannelMessage: {
      subcribe: withFilter(
        () => pubsub.asyncIterator([NEW_CHANNEL_MESSAGE]),
        (payload, args) => payload.channelId === args.channelId
      )
    }
  },

  Message: {
    user: ({ userId }, args, { models }) =>
      models.User.findOne({ where: { id: userId } }, { raw: true })
  },

  Query: {
    messages: requireAuth.createResolver(
      async (parent, { channelId }, { models }) =>
        models.Message.findAll(
          { order: [["created_at", "ASC"]], where: { channelId } },
          { raw: true }
        )
    )
  },

  Mutation: {
    createMessage: requireAuth.createResolver(
      async (parent, args, { models, user }) => {
        try {
          const message = await models.Message.create({
            ...args,
            userId: user.id
          });

          pubsub.publish(NEW_CHANNEL_MESSAGE, {
            channelId: args.channelId,
            newChannelMessage: message.dataValues
          });

          return true;
        } catch (err) {
          console.error(err);
          return false;
        }
      }
    )
  }
};
