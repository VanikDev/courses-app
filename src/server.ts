// TODO: add route path constants
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import exphbs from 'express-handlebars'
import csrf from 'csurf'
import flash from 'connect-flash'
import session from 'express-session'
import helmet from 'helmet'
import compression from 'compression'
import connectMongoDbSession from 'connect-mongodb-session'
import favicon from 'serve-favicon'

import homeRoutes from './routes/home.js'
import coursesRoutes from './routes/courses.js'
import coursesAdd from './routes/add.js'
import cartRoutes from './routes/cart.js'
import ordersRoutes from './routes/orders.js'
import authRoutes from './routes/auth.js'
import profileRoutes from './routes/profile.js'

import variablesMiddleware from './middleware/variables.js'
import userMiddleware from './middleware/user.js'
import errorHandler from './middleware/error.js'
import fileMiddleware from './middleware/file.js'
import keys from '../keys/index.js'
import hbsHelpers from './utils/hbs-helpers.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const MongoStore = connectMongoDbSession(session)
/** Initial Express and HBS */
const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  helpers: hbsHelpers,
})

const store = new MongoStore({
  collection: 'sessions',
  uri: keys.MONGODB_URI,
})

/** In Express registered HBS as an engine for rendering HTML pages */
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(process.cwd(), 'src', 'views'))

app.use(express.static(path.join(__dirname, '..', 'public'))) // middleware (static public)
app.use('/images', express.static(path.join(__dirname, 'images'))) // middleware (static images)
app.use(express.urlencoded({ extended: true })) // form processing
app.use(
  session({
    secret: keys.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: store as any,
  })
) // session middleware
app.use(fileMiddleware.single('avatar')) // file middleware
app.use(csrf()) // CSRF-protection
app.use(flash()) // connect-flash
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'img-src': ["'self'", 'https:'],
        'script-src': ["'self'", 'https://cdnjs.cloudflare.com'],
      },
    },
  })
) // helmet
app.use(compression()) // compression
app.use(variablesMiddleware) // initialization variable middleware
app.use(userMiddleware) // initialization user middleware

/** Routes | (args: prefix, routes) */
app.use('/', homeRoutes) // home routes
app.use('/courses', coursesRoutes) // courses routes
app.use('/add', coursesAdd) // courses add routes
app.use('/cart', cartRoutes) // cart routes
app.use('/orders', ordersRoutes) // orders routes
app.use('/auth', authRoutes) // auth routes
app.use('/profile', profileRoutes) // profile routes

/** Favicon */
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico'))) // favicon

/** 404 */
app.use(errorHandler)


/** Crete port */
const PORT = process.env.PORT || 3000

/** MongoDB connect */
async function start(): Promise<void> {
  try {
    await mongoose.connect(keys.MONGODB_URI!)
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}
start()

/** Движки для генерации HTML-файлов
 * PUG: https://pugjs.org/api/getting-started.html
 * EJS: https://ejs.co/ (есть по умолчанию в Express)
 * Handlebars: https://handlebarsjs.com/
 * */
