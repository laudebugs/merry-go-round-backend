const nodemailer = require("nodemailer");

let conf = require("dotenv").config("../../").parsed;

const emailClient = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "apikey",
    pass: conf.SENDGRID_KEY,
  },
});

export default emailClient;
