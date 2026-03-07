const { Router } = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Add course',
    isAdd: true,
  })
})

router.post('/', (req, resp) => {
  console.log(req.body)
  resp.redirect('/courses')
})

module.exports = router
