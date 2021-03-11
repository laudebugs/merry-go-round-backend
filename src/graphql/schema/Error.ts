import { registerEnumType } from "type-graphql";

export enum Error {
  "INCORRECT_PASSWORD" = 1,
  "INVALID_TOKEN",
  "INVALID_EMAIL",
  "NON_UNIQUE_EMAIL",
  "NON_UNIQUE_PASSWORD",
}
registerEnumType(Error, {
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
