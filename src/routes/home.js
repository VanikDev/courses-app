import { Router } from 'express'
const router = Router()

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Home page',
    isHome: 'true',
  })
})

export default router
