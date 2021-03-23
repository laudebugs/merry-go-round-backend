"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
let conf = require("dotenv").config("../../").parsed.SENDGRID_KEY;
const emailClient = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false,
    auth: {
        user: "apikey",
        pass: process.env.SENDGRID_KEY || conf,
    },
});
exports.default = emailClient;
//# sourceMappingURL=emailClient.js.map