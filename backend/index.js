import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import models from "./models";
import path from "path";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";

const SECRET =
  "thisisjustanothergibberishwdbbbfsh684833hcdhxh4ithsomenumberslike398465";

const SECRET2 =
  "thisisjdfkjjhdfldlzbcbvxvgcgujsjkjdfkdf77e7rnbxbswe94843stanothergibberishwithsomenumberslike398465";

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")));

const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models,
    SECRET,
    SECRET2,
    user: {
      id: 1
    }
  }
});

const app = express();

server.applyMiddleware({
  app
});

app.use(cors());

try {
  models.sequelize.sync({}).then(() => {
    app.listen(4000, () => {
      console.log(`Server on port http://localhost:4000${server.graphqlPath}`);
    });
  });
} catch (err) {
  console.error(err.message);
}
