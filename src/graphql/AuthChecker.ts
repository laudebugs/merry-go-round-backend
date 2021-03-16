import { AuthChecker } from "type-graphql";
/**
 * Roots custom auth checker
 * @param { root, arguments, context, info }
 * @param roles
 */
export const AuthCheckerFn: AuthChecker = (
  { root, args, context, info },
  roles
) => {
  // For Super Users - they can access everything
  //@ts-ignore
  if (context.roles.includes("0")) {
    return true;
  }
  // For Moderators \
  //@ts-ignore
  if (roles.includes("ADMIN") && context.roles.includes("1")) {
    return true;
  }
  // If no roles are required
  if (roles.length == 0) {
    return true;
  }
  // If none of the above checks pass
  return false; // or false if access id denied
};
