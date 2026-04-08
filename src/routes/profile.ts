import { Router, Request, Response } from 'express'
import User from '../models/user.js'
import { ProfileBody, ProfileRequest } from '#/types/routes.js'

const router: Router = Router()

router.get('/', async (req: Request, res: Response): Promise<void> => {
  res.render('profile', {
    title: 'Profile',
    isProfile: true,
    user: req.user.toObject(),
  })
})

router.post('/', async (req: ProfileRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user._id)

    const toChange = {
      name: req.body.name,
      avatarUrl: undefined
    }

    if (req.file) {
      toChange.avatarUrl = req.file.path
    }

    Object.assign(user, toChange)
    await user.save()
    res.redirect('/profile')
  } catch (e) {
    console.log(e)
  }
})

export default router
