"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./data/schema");
// Initialize app
const app = express_1.default();
const { DB } = require("mongodb");
require("./data/db");
app.root = { hello: () => "Welcome to the Merry-Go-Round api" };
app.use("/graphql", express_graphql_1.graphqlHTTP({ schema: schema_1.schema, graphiql: true }));
app.get("*", (req, res) => {
    res.json({ message: "Welcome to the Merry-Go-Round api" });
});
const PORT = 9000;
app.listen(9000, () => {
    console.log(`api is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map