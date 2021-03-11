import { ApolloServer } from "apollo-server-express";
import express from "express";
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

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      // console.log(req.headers.authorization);
      const token = req.headers.authorization || "";
      const user = verifyToken(token);
      return user;
    },
  });

  server.applyMiddleware({ app });

  const PORT = 7000;
  app.listen(PORT, () => {
    console.log(`api is running on port ${PORT}`);
  });
})();
