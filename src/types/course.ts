import { Document, Types } from 'mongoose'

export interface ICourse {
  title: string
  price: number
  img?: string
  userId?: Types.ObjectId
}

export interface ICourseDocument extends ICourse, Document {
  toClient(): ICourse & { id: string }
  _doc?: any; // TODO: fix
}