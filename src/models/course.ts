// model Course for working with MongoDB
import { Schema, model } from 'mongoose'
import { ICourseDocument } from '../types/course.js'

const courseSchema = new Schema<ICourseDocument>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // связка в бд
  },
})

courseSchema.method('toClient', function (this: ICourseDocument) {
  const course = this.toObject()

  course.id = course._id
  delete course._id

  return course
})

export default model<ICourseDocument>('Course', courseSchema) // args(name, schema)
