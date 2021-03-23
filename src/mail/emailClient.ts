const nodemailer = require("nodemailer");

let conf = require("dotenv").config("../../").parsed.SENDGRID_KEY;

const emailClient = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_KEY || conf,
  },
});

export default emailClient;
