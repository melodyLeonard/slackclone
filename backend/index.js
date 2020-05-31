import express from "express";
import { createServer} from 'http';
import bodyParser from 'body-parser'
// import {graphqlExpress, graphiqlExpress} from 'graphql-server-express'
import { ApolloServer } from "apollo-server-express";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import cors from "cors";
import models from "./models";
import path from "path";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";

const app = express();

const SECRET =
  "thisisjustanothergibberishwdbbbfsh684833hcdhxh4ithsomenumberslike398465";

const SECRET2 = "metamorphosisandjustintime1238654";

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")));

const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

app.use(bodyParser.json())
app.use(cors('*'));

// const addUser = async(req, res, next) => {
//   const token = req.headers['x-token'];
//   if (token) {
//     try {
//       const {user} = jwt.verify(token, SECRET);
//       req.user = user;
//     } catch (err) {
//       const refreshToken = req.headers['x-refresh-token'];
//       const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
//       if (newTokens.token && newTokens.refreshToken){
//         res.set('Access-Control-Expose-Headers', 'x-token', 'x-refresh-token');
//         res.set('x-token', newTokens.token);
//         res.set('x-refresh-token', newTokens.refreshToken)
//       }
//       req.user = newTokens.user;
//     }
//   }
//   next();
// }

// app.use(addUser);

// const graphqlEndpoint = '/graphql'

// app.use(graphqlEndpoint, bodyParser.json(),graphqlExpress( req => ({
//   typeDefs,
//     context: {
//       models,
//       user: req.user,
//       SECRET,
//       SECRET2,
//     }
// })))

// const server = createServer(app)

// app.use('/graphiql', graphiqlExpress({
//   endpointURL: '/graphql',
//   subscriptionsEndpoint: `ws://localhost:4000/subscriptions`
// }))


// try {
//   models.sequelize.sync({}).then(() => {
//     server.listen(4000, () => {
//      new SubscriptionServer({
//        schema,
//        execute,
//        subscribe
//         onConnect: async({token, refreshToken}, webSocket) => {
//           if (token && refreshToken) {
//             let user = null
//                 try {
//       const payload = jwt.verify(token, SECRET);
//       user = payload.user
//     } catch (err) {
//       const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
//       user = newTokens.user
//       req.user = newTokens.user;
//     }
//     if(!user){
//       throw new Error('Invalid auth tokens')
//     }
//       return true
//           }
//           throw new Error('Missing auth tokens!')
// }
//      }, {
//         server,
//         path: '/subscriptions'
//      })
//     });
//   });
// } catch (err) {
//   console.error(err.message);
// }



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


server.applyMiddleware({
  app
});


try {
  models.sequelize.sync({}).then(() => {
    app.listen(4000, () => {
      console.log(`Server on port http://localhost:4000${server.graphqlPath}`);
    });
  });
} catch (err) {
  console.error(err.message);
}

