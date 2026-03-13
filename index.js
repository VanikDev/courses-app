// TODO: switch to type "module", replace require with imports
// TODO: TypeScript
// TODO: add route path constants

const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const favicon = require('serve-favicon')
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const coursesAdd = require('./routes/add')
const cardRoutes = require('./routes/card')

/** Initial Express and HBS */
const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
})

/** In Express registered HBS as an engine for rendering HTML pages */
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public'))) // add middleware (регистрация папки public)
app.use(express.urlencoded({ extended: true })) // form processing

/** Routes | (args: prefix, routes) */
app.use('/', homeRoutes) // home routes
app.use('/courses', coursesRoutes) // courses routes
app.use('/add', coursesAdd) // courses add routes
app.use('/card', cardRoutes) // card routes

/** Favicon */
app.use(favicon(__dirname + '/public/favicon.ico')) // favicon

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
    const url =
      'mongodb://vanik_db_user:30alSg5oFMbBeCV0@ac-6fafcdo-shard-00-00.q3juvi3.mongodb.net:27017,ac-6fafcdo-shard-00-01.q3juvi3.mongodb.net:27017,ac-6fafcdo-shard-00-02.q3juvi3.mongodb.net:27017/shop?ssl=true&replicaSet=atlas-lpg9j6-shard-0&authSource=admin&appName=Cluster0'
    await mongoose.connect(url)
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
