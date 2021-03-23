import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createServer } from "http";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { verifyToken } from "./database/authentication";
import { AuthCheckerFn } from "./graphql/AuthChecker";
import {
  BidResolver,
  ProductResolver,
  UserResolver,
} from "./graphql/resolvers";
/**
 * Require environment variables
 */
require("dotenv").config();
require("./database/db");
// Environment variables

(async function main() {
  const schema = await buildSchema({
    resolvers: [UserResolver, ProductResolver, BidResolver],
    emitSchemaFile: true,
    authChecker: AuthCheckerFn,
    authMode: "null",
  });

  const app = express();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      //@ts-ignore
      if (!!req) {
        const token = req.headers.authorization || "";
        const user = verifyToken(token);
        console.log(user);
        return user;
      }
      console.log("nulling");
      return null;
    },
    subscriptions: "/subs",
  });

  apolloServer.applyMiddleware({ app });

  const httpServer = createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  const PORT = process.env.PORT || 7000;
  httpServer.listen(PORT, () => {
    console.log(`api is running on port ${PORT}`);
  });
})();
