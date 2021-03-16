const nodemailer = require("nodemailer");

const emailClient = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_KEY,
  },
});

export default emailClient;
