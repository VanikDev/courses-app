import keys from '../keys/index.js'

const resetEmail = (email, token) => ({
  from: keys.SENDER,
  to: email,
  subject: 'Access restoration',
  category: 'Reset Password',
  // text: 'Congrats for sending test email with Mailtrap!',
  html: `
        <h1>Forgot your password?</h1>
        <p>If not, then ignore this letter.</p>
        <p>Otherwise click on the link below:</p>
        <p>
            <a href="${keys.BASE_URL}/auth/password/${token}">Restore access</a>
        </p>
        <hr />
        <a href="${keys.BASE_URL}">Courses shop</a>
    `,
})

export default resetEmail
