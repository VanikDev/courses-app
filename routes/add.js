const { Router } = require('express')
const Course = require('../models/course')
const { validationResult } = require('express-validator')
const { courseValidators } = require('../utils/validators')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', auth, (req, res) => {
  res.render('add', {
    title: 'Add course',
    isAdd: true,
  })
})

router.post('/', auth, courseValidators, async (req, res) => {
  const { title, price, img } = req.body
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    // req.flash('courseError', errors.array()[0].msg)
    return res.status(422).render('add', {
      title: 'Add course',
      isAdd: true,
      error: errors.array()[0].msg,
      data: {
        title,
        price,
        img,
      },
    })
  }

  const course = new Course({
    title,
    price,
    img,
    userId: req.user, // такая запись возможна, тк в модели указан ObjectId
  })

  try {
    await course.save()
    res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
