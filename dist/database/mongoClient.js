"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const Realm = __importStar(require("realm"));
const app = new Realm.App({ id: "merry-go-round-ywepf" });
// Create an anonymous credential
const credentials = Realm.Credentials.anonymous();
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield app.logIn(credentials);
            console.log("Successfully logged in!", user.id);
            return user;
        }
        catch (err) {
            console.error("Failed to log in", err.message);
        }
    });
}
function handleLogin() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a Credentials object to identify the user.
        // Anonymous credentials don't have any identifying information, but other
        // authentication providers accept additional data, like a user's email and
        // password.
        const credentials = Realm.Credentials.anonymous();
        // You can log in with any set of credentials using `app.logIn()`
        const user = yield app.logIn(credentials);
        console.log(`Logged in with the user id: ${user.id}`);
    });
}
handleLogin().catch((err) => {
    console.error("Failed to log in:", err);
});
//# sourceMappingURL=mongoClient.js.map