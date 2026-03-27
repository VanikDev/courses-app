import keys from '../keys/index.js'

const regEmail = (email) => ({
  from: keys.SENDER,
  to: email,
  subject: 'Account created successfully!',
  category: 'Integration Test',
  // text: 'Congrats for sending test email with Mailtrap!',
  html: `
        <h1>Welcome to our store!</h1>
        <p>You have successfully created an account with email — ${email}</p>
        <hr />
        <a href="${keys.BASE_URL}">Courses shop</a>
    `,
})

export default regEmail
