import { Request, Response, NextFunction } from 'express'
import User from '../models/user.js'

export default async function userMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user) {
    return next()
  }
  req.user = await User.findById(req.session.user._id)
  next()
}
