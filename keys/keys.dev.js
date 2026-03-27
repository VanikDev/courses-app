const EMAIL_FROM = 'nodejs-courses@example.com'

export default {
  MONGODB_URI:
    'mongodb://vanik_db_user:30alSg5oFMbBeCV0@ac-6fafcdo-shard-00-00.q3juvi3.mongodb.net:27017,ac-6fafcdo-shard-00-01.q3juvi3.mongodb.net:27017,ac-6fafcdo-shard-00-02.q3juvi3.mongodb.net:27017/shop?ssl=true&replicaSet=atlas-lpg9j6-shard-0&authSource=admin&appName=Cluster0',
  SESSION_SECRET: 'some secret value',
  MAILTRAP_TOKEN: 'f5dbb64e4f47d3d61351f3d7e2e045c5',
  EMAIL_FROM,
  BASE_URL: 'http://localhost:3000',
  SENDER: {
    address: EMAIL_FROM,
    name: 'Mailtrap Test',
  },
}
