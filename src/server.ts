import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { getAuthenticatedUser } from "./database/functions";
import {
  BidResolver,
  ProductResolver,
  UserResolver,
} from "./graphql/resolvers";
require("./database/db");
(async function main() {
  const schema = await buildSchema({
    resolvers: [UserResolver, ProductResolver, BidResolver],
    emitSchemaFile: true,
  });

  const app = express();

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      const user = await getAuthenticatedUser(token);
      return user;
    },
  });

  server.applyMiddleware({ app });

  const PORT = 7000;
  app.listen(PORT, () => {
    console.log(`api is running on port ${PORT}`);
  });
})();
