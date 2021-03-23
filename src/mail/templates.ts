import emailClient from "./emailClient";

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

export async function sendWelcomeEmail(
  recipient: String,
  username: String,
  password: String
) {
  try {
    let info = await emailClient.sendMail({
      from: '"Laurence (RUF Coffee House Support)" lbi213@nyu.edu', // sender address
      to: recipient,
      subject: "Welcome to RUF Coffee House (Pandemic Edition)",
      text: `Here are your new credentials: 
                    username: ${username}
                    email: ${recipient}
                    password: ${password}
            `,
      html: `<div>
              <p> Here are your new credentials in case you get logged out. Log in with your email and password</p>
               <p> username: ${username} </p>
                <p>email: ${recipient}</p>
                <p>password: ${password}</p>

                <p> Sign in <a href="https://rufcofeehouse.web.app/" target="__blank">here</a>.
              </div>
          `,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error.message);
  }
}
