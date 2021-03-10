// import * as Realm from "realm";

// const app = new Realm.App({ id: "merry-go-round-ywepf" });
// // Create an anonymous credential
// const credentials = Realm.Credentials.anonymous();
// async function login() {
//   try {
//     const user = await app.logIn(credentials);
//     console.log("Successfully logged in!", user.id);
//     return user;
//   } catch (err) {
//     console.error("Failed to log in", err.message);
//   }
// }

// async function handleLogin() {
//   // Create a Credentials object to identify the user.
//   // Anonymous credentials don't have any identifying information, but other
//   // authentication providers accept additional data, like a user's email and
//   // password.
//   const credentials = Realm.Credentials.anonymous();
//   // You can log in with any set of credentials using `app.logIn()`
//   const user = await app.logIn(credentials);
//   console.log(`Logged in with the user id: ${user.id}`);
// }
// handleLogin().catch((err) => {
//   console.error("Failed to log in:", err);
// });
