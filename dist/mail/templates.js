"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetEmail = exports.sendWelcomeEmail = void 0;
const path_1 = __importDefault(require("path"));
const emailClient_1 = __importDefault(require("./emailClient"));
const hbs = require("nodemailer-express-handlebars");
emailClient_1.default.use("compile", hbs({
    viewEngine: {
        extName: ".handlebars",
        partialsDir: path_1.default.resolve(__dirname, "views"),
        defaultLayout: false,
    },
    viewPath: path_1.default.resolve(__dirname, "views"),
    extName: ".hbs",
}));
function sendWelcomeEmail(recipient, username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let info = yield emailClient_1.default.sendMail({
                from: '"Laurence (RUF Coffee House Support)" lbi213@nyu.edu',
                to: recipient,
                subject: "RUF Coffee House Pandemic Edition Raffle",
                template: "email",
                context: {
                    username: username,
                    recipient: recipient,
                    password: password,
                },
            });
            console.log(info.messageId);
            return info.messageId;
        }
        catch (error) {
            console.log(error.message);
        }
    });
}
exports.sendWelcomeEmail = sendWelcomeEmail;
function sendResetEmail(recipient, username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let info = yield emailClient_1.default.sendMail({
                from: '"Laurence (RUF Coffee House Support)" lbi213@nyu.edu',
                to: recipient,
                subject: "Password Reset Request",
                text: `Here are your new credentials: 
                    username: ${username} 
                    password: ${password}
            `,
                html: `<div>
              <p> Here are your new credentials:</p>
                <p>username: ${username}</p>
                <p>password: ${password}</p>
              </div>
          `,
            });
            console.log("Message sent: %s", info.messageId);
        }
        catch (error) {
            console.log(error.message);
        }
    });
}
exports.sendResetEmail = sendResetEmail;
//# sourceMappingURL=templates.js.map