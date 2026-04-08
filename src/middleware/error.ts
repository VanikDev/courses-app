import { Request, Response, NextFunction }  from 'express'

export default function errorHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).render('404', {
    title: 'Page not found',
  })
}
