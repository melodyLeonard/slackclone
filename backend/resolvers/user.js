import bcrypt from "bcrypt";
import _ from "lodash";
import { tryLogin } from "../auth";
import { formatErrors } from "../formatErrors";

export default {
  Query: {
    getUser: (parent, args, { models }) => models.User.findOne({ where: args }),
    allUsers: (parent, args, { models }) => models.User.findAll()
  },

  Mutation: {
    login: async (parent, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET, SECRET2),

    register: async (parent, { password, ...otherArgs }, { models }) => {
      try {
        if (password.length < 5 || password.length > 200) {
          return {
            ok: false,
            errors: [
              {
                path: "password",
                message:
                  "The password needs to be between 5 and 200 characters long"
              }
            ]
          };
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await models.User.create({
          ...otherArgs,
          password: hashedPassword
        });

        return {
          ok: true,
          user
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    }
  }
};
