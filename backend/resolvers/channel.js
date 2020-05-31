import { requireAuth } from "../permissions";
import { formatErrors } from "../formatErrors";

export default {
  Query: {
    singleChannel: (parent, args, { models }) => models.Channel.findOne({ where: args }),
    allChannels: (parent, args, { models }) => models.Channel.findAll()
  },
  Mutation: {
    createChannel: requireAuth.createResolver(
      async (parent, args, { models }) => {
        try {
          const channel = await models.Channel.create(args);
          return {
            ok: true,
            channel
          };
        } catch (err) {
          return {
            ok: false,
            errors: formatErrors(err, models)
          };
        }
      }
    )
  }
};
