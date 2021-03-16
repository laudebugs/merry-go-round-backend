"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
let conf = require("dotenv").config("../../").parsed;
const emailClient = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false,
    auth: {
        user: "apikey",
        pass: conf.SENDGRID_KEY,
    },
});
exports.default = emailClient;
//# sourceMappingURL=emailClient.js.map