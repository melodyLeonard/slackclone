import express from "express";
import { ApolloServer } from "apollo-server-express";

import { SubscriptionServer } from "subscriptions-transport-ws";

import { execute, subscribe } from "graphql";

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
  },
  introspection: true,
  playground: true
});

const app = express();

server.applyMiddleware({
  app
});

app.use(cors());

try {
  models.sequelize.sync().then(() => {
    app.listen(4000, () => {
      console.log(`Server on port http://localhost:4000${server.graphqlPath}`);
    });
  });
} catch (err) {
  console.error(err.message);
}

// import express from 'express';
// import {
//   graphqlExpress,
//   graphiqlExpress,
// } from 'apollo-server-express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import { execute, subscribe } from 'graphql';
// import { createServer } from 'http';
// import { SubscriptionServer } from 'subscriptions-transport-ws';

// const PORT = 4000;
// const server = express();

// server.use('*', cors({ origin: `http://localhost:${PORT}` }));

// server.use('/graphql', bodyParser.json(), graphqlExpress({
//   typeDefs
// }));

// server.use('/graphiql', graphiqlExpress({
//   endpointURL: '/graphql',
//   subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
// }));

// // Wrap the Express server
// const ws = createServer(server);
// ws.listen(PORT, () => {
//   console.log(`Apollo Server is now running on http://localhost:${PORT}`);
//   // Set up the WebSocket for handling GraphQL subscriptions
//   new SubscriptionServer({
//     execute,
//     subscribe,
//     schema
//   }, {
//     server: ws,
//     path: '/subscriptions',
//   });
// });
