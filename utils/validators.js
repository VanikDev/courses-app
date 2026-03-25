const { body, validationResult } = require('express-validator')
const User = require('../models/user')

exports.registerValidators = [
  body('email')
    .isEmail()
    .withMessage('Enter correct email')
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value })

        if (user) {
          return Pormise.reject('User with this email already exists')
        }
      } catch (e) {
        console.log(e)
      }
    })
    .normalizeEmail(),
  body('password', 'Enter a password with at least 6 and no more than 56 characters')
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),
  body('confirm')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords must match')
      }
      return true
    })
    .trim(),
  body('name').isLength({ min: 3 }).withMessage('The name must be at least 3 characters long').trim(),
]
