const nodemailer = require("nodemailer");

const emailClient = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "apikey", // generated ethereal user
    pass: process.env.SENDGRID_KEY, // generated ethereal password
  },
});

export default emailClient;
