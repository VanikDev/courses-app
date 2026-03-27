const multer = require('multer')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'images') // args (error, path)
  },
  filename(req, file, cb) {
    // cb(null, new Date().toISOString() + '-' + file.originalname) // args (error, fileName)
    cb(null, `${new Date().toISOString()}-${file.originalname}`) // args (error, fileName)
  },
})

// file validation
const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true) // validation success
  } else {
    cb(null, false)
  }
}

module.exports = multer({
  storage,
  fileFilter,
})
