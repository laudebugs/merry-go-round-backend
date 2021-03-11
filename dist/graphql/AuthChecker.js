"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCheckerFn = void 0;
/**
 * Roots custom auth checker
 * @param { root, arguments, context, info }
 * @param roles
 */
const AuthCheckerFn = ({ root, args, context, info }, roles) => {
    // For Super Users - they can access everything
    if (context[0].roles.includes("0")) {
        return true;
    }
    // For Moderators
    if (roles.includes("ADMIN") && context[0].roles.includes("1")) {
        return true;
    }
    // If no roles are required
    if (roles.length == 0) {
        return true;
    }
    // If none of the above checks pass
    return false; // or false if access id denied
};
exports.AuthCheckerFn = AuthCheckerFn;
//# sourceMappingURL=AuthChecker.js.map