import { Router, Request, Response } from 'express'
import Course from '#/models/course.js'
import { validationResult } from 'express-validator'
import { courseValidators } from '#/utils/validators.js'
import auth from '#/middleware/auth.js'
import { IUser } from '#/types/user.js'

interface AddCourseBody {
  title: string
  price: string | number
  img: string
}

interface RequestWithUser extends Request {
  user?: IUser | null
}

const router: Router = Router()

router.get('/', auth, (req: Request, res: Response) => {
  res.render('add', {
    title: 'Add course',
    isAdd: true,
  })
})

router.post('/', auth, courseValidators, async (req: RequestWithUser, res: Response): Promise<void> => {
  const { title, price, img } = req.body as AddCourseBody
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
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
    userId: req.user,
  })

  try {
    await course.save()
    res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }
})

export default router
