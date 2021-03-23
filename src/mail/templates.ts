import path from "path";
import emailClient from "./emailClient";
const hbs = require("nodemailer-express-handlebars");

emailClient.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve(__dirname, "views"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "views"),
    extName: ".hbs",
  })
);

export async function sendWelcomeEmail(
  recipient: String,
  username: String,
  password: String
) {
  try {
    let info = await emailClient.sendMail({
      from: '"Laurence (RUF Coffee House Support)" lbi213@nyu.edu', // sender address
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
  } catch (error) {
    console.log(error.message);
  }
}

export async function sendResetEmail(
  recipient: String,
  username: String,
  password: String
) {
  try {
    let info = await emailClient.sendMail({
      from: '"Laurence (RUF Coffee House Support)" lbi213@nyu.edu', // sender address
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
  } catch (error) {
    console.log(error.message);
  }
}
