"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const type_graphql_1 = require("type-graphql");
var Role;
(function (Role) {
    Role[Role["SUPER"] = 0] = "SUPER";
    Role[Role["ADMIN"] = 1] = "ADMIN";
})(Role = exports.Role || (exports.Role = {}));
type_graphql_1.registerEnumType(Role, {
    name: "Role",
    description: "Roles of a User based on access",
    valuesConfig: {
        SUPER: {
            description: "An Admin has all privilages",
        },
        ADMIN: {
            description: "A Moderator has some privilages",
        },
    },
});
