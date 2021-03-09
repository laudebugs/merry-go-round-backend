import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./graphql/resolvers";
require("./database/db");

(async function main() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true,
  });

  const app = express();

  const server = new ApolloServer({
    schema,
  });

  server.applyMiddleware({ app });

  const PORT = 7000;
  app.listen(PORT, () => {
    console.log(`api is running on port ${PORT}`);
  });
})();
