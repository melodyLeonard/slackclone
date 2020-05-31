import { formatErrors } from "../formatErrors.js";
import { requireAuth } from "../permissions";

export default {
  // Query: {
  //   allTeams: requireAuth.createResolver(async(parent, args, {models, user}) =>
  //     models.Team.findAll({where: {owner: user.id}}, {raw: true})
  //   ),
  //   inviteTeams: requireAuth.createResolver(async(parent, args, {models, user}) =>
  //   models.sequelize.query('select * from teams join members on id = team_id where user_id = args')

  //   )
  // },
  
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
