const { Router } = require('express')
const Nodemailer = require('nodemailer')
const { MailtrapTransport } = require('mailtrap')
const bcrypt = require('bcryptjs')
const router = Router()
const User = require('../models/user')
const keys = require('../keys')
const regEmail = require('../emails/registration')

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: keys.MAILTRAP_TOKEN,
    sandbox: true,
    testInboxId: 4476250,
  })
)

router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Auth',
    isLogin: true,
    loginError: req.flash('loginError'),
    registerError: req.flash('registerError'),
  })
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const candidate = await User.findOne({ email })

    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password)

      if (areSame) {
        const user = candidate
        req.session.user = user
        req.session.isAuthenticated = true
        req.session.save((err) => {
          if (err) {
            throw err
          }
          res.redirect('/')
        })
      } else {
        req.flash('loginError', 'Wrong password')
        res.redirect('/auth/login#login')
      }
    } else {
      req.flash('loginError', 'User does not exists')
      res.redirect('/auth/login#login')
    }
  } catch (e) {
    console.log(e)
  }
})

router.get('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err)
    }
    res.clearCookie('connect.sid')
    res.redirect('/auth/login#login')
  })
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, repeat } = req.body
    const candidate = await User.findOne({ email })

    if (candidate) {
      req.flash('registerError', 'User with this email already exists')
      res.redirect('/auth/login#register')
    } else {
      const hashPassword = await bcrypt.hash(password, 10) // args(password, solt length)
      const user = new User({
        name,
        email,
        password: hashPassword,
        cart: {
          items: [],
        },
      })
      await user.save()
      res.redirect('/auth/login')
      await transport.sendMail(regEmail(email)).then(console.log, console.error)
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
