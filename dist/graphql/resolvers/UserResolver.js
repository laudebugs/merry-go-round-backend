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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Credentials = exports.UserInput = void 0;
const type_graphql_1 = require("type-graphql");
const authentication_1 = require("../../database/authentication");
const db_1 = require("../../database/db");
const schema_1 = require("../schema");
let UserInput = class UserInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], UserInput.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserInput.prototype, "password", void 0);
__decorate([
    type_graphql_1.Authorized(["SUPER"]),
    type_graphql_1.Field((type) => schema_1.Role, { nullable: true }),
    __metadata("design:type", Array)
], UserInput.prototype, "roles", void 0);
UserInput = __decorate([
    type_graphql_1.InputType({ description: "A User Input" })
], UserInput);
exports.UserInput = UserInput;
let Credentials = class Credentials {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Credentials.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Credentials.prototype, "password", void 0);
Credentials = __decorate([
    type_graphql_1.InputType({ description: "Credentials of a user" })
], Credentials);
exports.Credentials = Credentials;
let UserResolver = class UserResolver {
    /**
     * The Sign in mutation - signs in a user
     * And returns a JWt
     * @param credentials
     * @return token | null -> valid | invalid
     */
    signin(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = yield authentication_1.authenticateUser(credentials.username, credentials.password);
            return token;
        });
    }
    /**
     *
     * @param user
     */
    signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO: "Sign up and send JWT"
            let newUser = new db_1.User({
                username: user.username,
                password: user.password,
                email: user.email,
            });
            // returns a JWT that can then be used to verify a user
            yield newUser.save();
            let token = yield authentication_1.generateToken(user.username, user.roles);
            return token;
        });
    }
    //TODO: "Sign up and send JWT"
    signout(jwt) {
        // Deauthorize the JWT
        return "";
    }
};
__decorate([
    type_graphql_1.Mutation((returns) => String, {
        nullable: true,
        description: "Signs in a user",
    }),
    __param(0, type_graphql_1.Arg("credentials")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Credentials]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signin", null);
__decorate([
    type_graphql_1.Mutation({ description: "Signs up a user" }),
    __param(0, type_graphql_1.Arg("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInput]),
    __metadata("design:returntype", String)
], UserResolver.prototype, "signup", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation((returns) => String, {
        nullable: true,
        description: "Signs out a user",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "signout", null);
UserResolver = __decorate([
    type_graphql_1.Resolver((of) => schema_1.UserType)
], UserResolver);
exports.default = UserResolver;
//# sourceMappingURL=UserResolver.js.map