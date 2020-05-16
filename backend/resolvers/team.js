import { formatErrors } from "../formatErrors.js";
import { requireAuth } from "../permissions";

export default {
  Mutation: {
    createTeam: requireAuth.createResolver(
      async (parent, args, { models, user }) => {
        try {
          await models.Team.create({ ...args, owner: user.id });
          return {
            ok: true
          };
        } catch (err) {
          console.error(err);
          return {
            ok: false,
            errors: formatErrors(err, models)
          };
        }
      }
    )
  }
};
