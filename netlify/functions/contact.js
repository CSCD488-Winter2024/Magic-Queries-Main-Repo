const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

const handler = async function (event) {
  // get data from body
  const { fname, lname, email, message } = JSON.parse(event.body);

  // set API key
  client.setApiKey(SENDGRID_API_KEY);

  // setup data for email
  // NOTE: THIS IS NOT SECURE. YOU NEED TO SANITIZE THE INPUTS
  const data = {
    to: "msinclair@ewu.edu", // Change to your recipient (your email in this case)
    from: "test@example.com", // Change to your verified sender
    subject: `New message from ${fname} ${lname} (${email})`,
    html: `<p>${message}</p>`,
  };

  try {
    await sgMail.send(data);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        msg: "Message sent successfully",
      }),
    };
  } catch (err) {
    return {
      statusCode: err.code,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ msg: err.message }),
    };
  }
};

export { handler };