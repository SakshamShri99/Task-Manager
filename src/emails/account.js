const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail
    .send({
      to: email,
      from: 'saksham@gmail.com',
      subject: 'Welcome',
      text: `Welcome to the app, ${name}. Let me know how you get along with the app! `,
    })
    .catch(e => console.log('Credentials not verified'));
};

const sendDeleteEmail = (email, name) => {
  sgMail
    .send({
      to: email,
      from: 'saksham@gmail.com',
      subject: 'Account Deleted Successfuly',
      text: `Hey ${name}, your account has been deleted successfully. Please take a minute of your time respond this email, telling why opt deleted your account.`,
    })
    .catch(e => console.log('Credentials not verified'));
};

module.exports = {
  sendWelcomeEmail,
  sendDeleteEmail,
};
