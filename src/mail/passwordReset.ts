import emailClient from "./emailClient";
import { psalms } from "./passes";

let random = Math.floor(Math.random() * psalms.phrases.length);
export async function sendResetEmail(recipient: string) {
  try {
    let info = await emailClient.sendMail({
      from: '"Laurence (RUF Coffee House Support)" lbi213@nyu.edu', // sender address
      to: recipient, // list of receivers
      subject: "Password Reset", // Subject line
      text: `Here's your new password: ${psalms.phrases[random]}`, // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error.message);
  }
}
