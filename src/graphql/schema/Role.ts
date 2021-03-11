import { registerEnumType } from "type-graphql";

export enum Role {
  "SUPER",
  "ADMIN",
}
registerEnumType(Role, {
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
