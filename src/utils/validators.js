import { body, validationResult } from 'express-validator'
import User from '../models/user.js'

export const registerValidators = [
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

export const loginValidators = [
  body('email').isEmail().withMessage('Enter correct email').normalizeEmail(),
  body('password', 'Enter a password with at least 6 and no more than 56 characters')
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),
]

export const courseValidators = [
  body('title').isLength({ min: 3 }).withMessage('The minimum length of the name is 3 characters').trim(),
  body('price').isNumeric().withMessage('Enter the correct price'),
  body('img').isURL().withMessage('Enter the correct image URL'),
]
