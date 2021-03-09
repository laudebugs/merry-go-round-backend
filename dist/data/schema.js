"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const resolvers_1 = require("./resolvers");
const graphql_tools_1 = require("graphql-tools");
// Define types
const typeDefs = `
  type User {
    name: String
    username: String
    email: String
    password: String
    tickets: Int
    award: Product
    bids: [Bid]
    kind: Boolean
  }
  input UserInput {
    name: String
    username: String
    email: String
    password: String
    tickets: Int
    bids: [BidInput]
    kind: Boolean
  }
  type Product {
    name: String
    id: String
    awardee: User
    bids: [Bid]
  }
  input ProductInput {
    name: String
    id: String
    awardee: UserInput
    bids: [BidInput]
  }
  type Bid {
    product: Int
    tickets: Int
    user: User
  }
  input BidInput {
    product: Int
    tickets: Int
    user: UserInput
  }
  type Query {
    getUser(username: String!): User
    getProducts: [Product]
    getBids(product: ProductInput): [Bid]
    sayHello: String
  }
  type Mutation {
    registerUser(user: UserInput): User
    registerProduct(product: ProductInput): Product
    makeBid(user: UserInput, bid: BidInput): Bid
  }
`;
const schema = graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers: resolvers_1.resolvers });
exports.schema = schema;
//# sourceMappingURL=schema.js.map