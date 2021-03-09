"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const db_1 = require("../../database/db");
const schema_1 = require("../schema");
const UserType_1 = require("../schema/UserType");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
let resolvers = class resolvers {
    //@ts-ignore
    login(username) {
        db_1.User.find({ username: username })
            .then((user) => {
            // TODO: Authenticate the user
            return user;
        })
            .catch((error) => {
            console.log(error.message);
            return null;
        });
    }
    //@ts-ignore
    signin(credentials) {
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/signin?error=true",
        });
    }
    //@ts-ignore
    signup(user) {
        //TODO: "Sign up and send JWT"
        let newUser = new db_1.User({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            roles: [UserType_1.Role[2]],
            award: [],
            bids: [],
        });
        newUser.save();
        // TODO: Return JWT
        // Return the JWT
        return "";
    }
    //TODO: "Sign up and send JWT"
    signout(jwt) {
        // Deauthorize the JWT
        return "";
    }
};
__decorate([
    type_graphql_1.Query((returns) => String, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], resolvers.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation((returns) => String, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], resolvers.prototype, "signin", null);
__decorate([
    type_graphql_1.Mutation((returns) => String, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [schema_1.UserType]),
    __metadata("design:returntype", String)
], resolvers.prototype, "signup", null);
__decorate([
    type_graphql_1.Mutation((returns) => String, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], resolvers.prototype, "signout", null);
resolvers = __decorate([
    type_graphql_1.Resolver((of) => schema_1.UserType)
], resolvers);
exports.default = resolvers;
//# sourceMappingURL=UserResolver.js.map