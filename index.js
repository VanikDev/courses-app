const express = require('express')
// const path = require('path')
const favicon = require('serve-favicon')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const coursesAdd = require('./routes/add')

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
})

// в express регистрируем hbs в качестве движка для рендеринга html-страниц
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public')) // add middleware (регистрация папки public)
app.use(express.urlencoded({ extended: true })) // form processing

app.use('/', homeRoutes) // add home routes | (args: prefix, routes)
app.use('/courses', coursesRoutes) // add courses routes | (args: prefix, routes)
app.use('/add', coursesAdd) // add courses add routes | (args: prefix, routes)

app.use(favicon(__dirname + '/public/favicon.ico')) // favicon

// routes before pages routes
// app.get('/', (req, res) => {
//     res.render('index', {
//         title: 'Home page',
//         isHome: 'true'
//     })
// })

// app.get('/courses', (req, res) => {
//     res.render('courses', {
//         title: 'Courses',
//         isCourses: true
//     })
// })

// app.get('/add', (req, res) => {
//     res.render('add', {
//         title: 'Add course',
//         isAdd: true
//     })
// })

const PORT = process.env.PORT || 3000

/** GET
 * @param {Request} req - запрос
 * @param {Response} resp - ответ
 * @param {NextFunction} next - продолжает выполнения других middlewares, требуется при реализации некоторых задач
 * */
// before handlebars
// app.get('/', (req, res,) => {
//     res.status(200); // 200 по умолчанию, необязательно
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// })

// app.get('/about', (req, res,) => {
//     res.sendFile(path.join(__dirname, 'views', 'about.html'));
// })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

/** Движки для генерации HTML-файлов
 * PUG: https://pugjs.org/api/getting-started.html
 * EJS: https://ejs.co/ (есть по умолчанию в Express)
 * Handlebars: https://handlebarsjs.com/
 * */
