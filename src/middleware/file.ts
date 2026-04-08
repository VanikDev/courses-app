import multer from 'multer'
import { Request } from 'express'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void
type FileFilterCallback = (error: Error | null, acceptFile: boolean) => void

const storage = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, cb: DestinationCallback) {
    cb(null, 'images') // args (error, path)
  },
  filename(req: Request, file: Express.Multer.File, cb: FileNameCallback) {
    cb(null, `${new Date().toISOString()}-${file.originalname}`) // args (error, fileName)
  },
})

// file validation
const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true) // validation success
  } else {
    cb(null, false)
  }
}

export default multer({
  storage,
  fileFilter,
})
