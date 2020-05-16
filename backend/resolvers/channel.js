import { requireAuth } from "../permissions";

export default {
  Mutation: {
    createChannel: requireAuth.createResolver(
      async (parent, args, { models }) => {
        try {
          await models.Channel.create(args);
          return true;
        } catch (err) {
          console.error(err);
          return false;
        }
      }
    )
  }
};
