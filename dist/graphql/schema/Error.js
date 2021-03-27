"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
const type_graphql_1 = require("type-graphql");
var Error;
(function (Error) {
    Error[Error["INCORRECT_PASSWORD"] = 1] = "INCORRECT_PASSWORD";
    Error[Error["INVALID_TOKEN"] = 2] = "INVALID_TOKEN";
    Error[Error["INVALID_EMAIL"] = 3] = "INVALID_EMAIL";
    Error[Error["NON_UNIQUE_EMAIL"] = 4] = "NON_UNIQUE_EMAIL";
    Error[Error["NON_UNIQUE_PASSWORD"] = 5] = "NON_UNIQUE_PASSWORD";
})(Error = exports.Error || (exports.Error = {}));
type_graphql_1.registerEnumType(Error, {
    name: "Error",
    description: "Errors when trying to access the system",
    valuesConfig: {
        INCORRECT_PASSWORD: {
            description: "Wrong Password Entered",
        },
        INVALID_EMAIL: {
            description: "A Moderator has some privilages",
        },
        INVALID_TOKEN: {
            description: "Invalid/Expired Token.",
        },
        NON_UNIQUE_EMAIL: {
            description: "Email already registered. Use a different email",
        },
        NON_UNIQUE_PASSWORD: {
            description: "Password is not Unique",
        },
    },
});
