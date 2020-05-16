import { ApolloError } from "apollo-server-core";
import { GraphQLError } from "graphql";
import models from "./models";
export const formatErrors = (err, models) => {
  if (err.originalError instanceof models.Sequelize.ValidationError) {
    return GraphQLError(
      err.errors.map(err => _.pick(err, ["path", "message"]))
    );
  } else if (err.originalError instanceof ApolloError) {
    return err.errors.map(err => _.pick(err, ["path", "message"]));
  } else return [{ path: " Server Error", message: "something went wrong" }];
};
