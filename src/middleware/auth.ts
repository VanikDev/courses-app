import { Request, Response, NextFunction }  from 'express'

export default function auth(req: Request, res: Response, next: NextFunction): void {
  if (!req.session.isAuthenticated) {
    return res.redirect('/auth/login')
  }
  next()
}
