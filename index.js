const express = require('express')
// const path = require('path')
const favicon = require('serve-favicon')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const coursesAdd = require('./routes/add')
const cardRoutes = require('./routes/card')

/** Initial Express and HBS */
const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
})

/** In Express registered HBS as an engine for rendering HTML pages */
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public')) // add middleware (регистрация папки public)
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

/** Listen port */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

/** Движки для генерации HTML-файлов
 * PUG: https://pugjs.org/api/getting-started.html
 * EJS: https://ejs.co/ (есть по умолчанию в Express)
 * Handlebars: https://handlebarsjs.com/
 * */
