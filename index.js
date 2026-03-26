// TODO: switch to type "module", replace require with imports
// TODO: try catch
// TODO: TypeScript
// TODO: add route path constants

const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const csrf = require('csurf')
const flash = require('connect-flash')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const favicon = require('serve-favicon')

const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const coursesAdd = require('./routes/add')
const cartRoutes = require('./routes/cart')
const ordersRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')
const variablesMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')
const errorHandler = require('./middleware/error')
const keys = require('./keys')
const hbsHelpers = require('./utils/hbs-helpers')

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
app.set('views', 'views')

/** User middleware */
// app.use(async (req, res, next) => {
//   try {
//     const user = await User.findById('69b8f85979004e56ca7bc79f')
//     req.user = user
//     next()
//   } catch (e) {
//     console.log(e)
//   }
// })

app.use(express.static(path.join(__dirname, 'public'))) // add middleware (регистрация папки public)
app.use(express.urlencoded({ extended: true })) // form processing
app.use(
  session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
) // session middleware
app.use(csrf()) // CSRF-protection
app.use(flash()) // connect-flash
app.use(variablesMiddleware) // initialization variable middleware
app.use(userMiddleware) // initialization user middleware

/** Routes | (args: prefix, routes) */
app.use('/', homeRoutes) // home routes
app.use('/courses', coursesRoutes) // courses routes
app.use('/add', coursesAdd) // courses add routes
app.use('/cart', cartRoutes) // cart routes
app.use('/orders', ordersRoutes) // orders routes
app.use('/auth', authRoutes) // auth routes

/** Favicon */
app.use(favicon(__dirname + '/public/favicon.ico')) // favicon

/** 404 */
app.use(errorHandler)

/** Routes without handlebars
  app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home page',
        isHome: 'true'
    })
  })

  app.get('/courses', (req, res) => {
    res.render('courses', {
        title: 'Courses',
        isCourses: true
    })
  })

  app.get('/add', (req, res) => {
      res.render('add', {
          title: 'Add course',
          isAdd: true
      })
  })
 */

/** Crete port */
const PORT = process.env.PORT || 3000

/** GET
 * @param {Request} req - запрос
 * @param {Response} resp - ответ
 * @param {NextFunction} next - продолжает выполнения других middlewares, требуется при реализации некоторых задач
 * 
 * Without handlebars
 app.get('/', (req, res,) => {
    res.status(200); // 200 по умолчанию, необязательно
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
  })

  app.get('/about', (req, res,) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
  })
*/

/** MongoDB connect */
async function start() {
  try {
    await mongoose.connect(keys.MONGODB_URI)
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}
start()

/** Listen port */
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`)
// })

/** Движки для генерации HTML-файлов
 * PUG: https://pugjs.org/api/getting-started.html
 * EJS: https://ejs.co/ (есть по умолчанию в Express)
 * Handlebars: https://handlebarsjs.com/
 * */
