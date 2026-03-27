export default {
  MONGODB_URI: process.env.MONGODB_URI,
  SESSION_SECRET: process.env.SESSION_SECRET,
  MAILTRAP_TOKEN: process.env.MAILTRAP_TOKEN,
  EMAIL_FROM: process.env.EMAIL_FROM,
  BASE_URL: process.env.BASE_URL,
  SENDER: {
    address: process.env.EMAIL_FROM,
    name: process.env.SENDER_NAME,
  },
}
