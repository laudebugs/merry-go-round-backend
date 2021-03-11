"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const authentication_1 = require("./database/authentication");
const AuthChecker_1 = require("./graphql/AuthChecker");
const resolvers_1 = require("./graphql/resolvers");
/**
 * Require environment variables
 */
require("dotenv").config();
require("./database/db");
// Environment variables
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = yield type_graphql_1.buildSchema({
            resolvers: [resolvers_1.UserResolver, resolvers_1.ProductResolver, resolvers_1.BidResolver],
            emitSchemaFile: true,
            authChecker: AuthChecker_1.AuthCheckerFn,
            authMode: "null",
        });
        const app = express_1.default();
        const server = new apollo_server_express_1.ApolloServer({
            schema,
            context: ({ req }) => {
                // console.log(req.headers.authorization);
                const token = req.headers.authorization || "";
                const user = authentication_1.verifyToken(token);
                return user;
            },
        });
        server.applyMiddleware({ app });
        const PORT = 7000;
        app.listen(PORT, () => {
            console.log(`api is running on port ${PORT}`);
        });
    });
})();
//# sourceMappingURL=server.js.map