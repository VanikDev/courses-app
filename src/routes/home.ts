import { Router, Request, Response } from 'express'
import Course from '../models/course.js'
import { IUserDocument } from '#/types/user.js'

const router: Router = Router()

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const courses = await Course.find().populate<{ userId: IUserDocument }>('userId', 'email name')
  
  res.render('index', {
    title: 'Home page',
    isHome: 'true',
    courses
  })
})

export default router
