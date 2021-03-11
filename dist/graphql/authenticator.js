"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCheckerFn = void 0;
/**
 * Roots custom auth checker
 * @param { root, arguments, context, info }
 * @param roles
 */
const AuthCheckerFn = ({ root, args, context, info }, roles) => {
    /*
    read the user from the context and
    check this permission in the db against the `roles` argument
    that comes from the @Authorized decorator, e.g. ["ADMIN", "MODERATOR"]
    */
    return true; // or false if access id denied
};
exports.AuthCheckerFn = AuthCheckerFn;
//# sourceMappingURL=authenticator.js.map