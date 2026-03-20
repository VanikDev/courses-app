const { Router } = require('express')
const Nodemailer = require('nodemailer')
const { MailtrapTransport } = require('mailtrap')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const router = Router()
const User = require('../models/user')
const keys = require('../keys')
const regEmail = require('../emails/registration')
const resetEmail = require('../emails/reset')

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

router.get('/reset', (req, res) => {
  res.render('auth/reset', {
    title: 'Forgot your password?',
    error: req.flash('error'),
  })
})

router.post('/reset', (req, res) => {
  try {
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        req.flash('err', 'Something is wrong, please try again later')
        return res.redirect('/auth/reset')
      }

      const token = buffer.toString('hex')
      const candidate = await User.findOne({ email: req.body.email })

      if (candidate) {
        candidate.resetToken = token
        candidate.resetTokenExp = Date.now() + 60 * 60 * 1000
        await candidate.save()
        await transport.sendMail(resetEmail(candidate.email, token)).then(console.log, console.error)
        res.redirect('/auth/login')
      } else {
        req.flash('error', 'There is no such email')
        res.redirect('/auth/reset')
      }
    })
  } catch (e) {
    console.log(e)
  }
})

router.get('/password/:token', async (req, res) => {
  if (!req.params.token) {
    return res.redirect('/auth/login')
  }

  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExp: { $gt: Date.now() },
    })

    if (!user) {
      return res.redirect('/auth/login')
    } else {
      res.render('auth/password', {
        title: 'Restore access',
        error: req.flash('error'),
        userId: user._id.toString(),
        token: req.params.token,
      })
    }
  } catch (e) {
    console.log(e)
  }
})

router.post('/password', async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.body.userId,
      resetToken: req.body.token,
      resetTokenExp: { $gt: Date.now() },
    })

    if (user) {
      user.password = await bcrypt.hash(req.body.password, 10)
      user.resetToken = undefined
      user.resetTokenExp = undefined
      await user.save()
      res.redirect('/auth/login')
    } else {
      req.flash('loginError', 'The token lifetime has expired')
      res.redirect('/auth/login')
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
