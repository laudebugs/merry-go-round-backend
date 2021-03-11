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
const _1 = require("./");
let UserType = class UserType {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], UserType.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserType.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field((type) => [_1.BidType]),
    __metadata("design:type", Array)
], UserType.prototype, "bids", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], UserType.prototype, "tickets", void 0);
__decorate([
    type_graphql_1.Field((type) => Number),
    __metadata("design:type", Number)
], UserType.prototype, "award", void 0);
__decorate([
    type_graphql_1.Authorized(["SUPER"]),
    type_graphql_1.Field((type) => _1.Role, { nullable: true }),
    __metadata("design:type", Array)
], UserType.prototype, "roles", void 0);
UserType = __decorate([
    type_graphql_1.ObjectType()
], UserType);
exports.default = UserType;
//# sourceMappingURL=UserType.js.map