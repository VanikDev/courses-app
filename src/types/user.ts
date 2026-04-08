import { Document, Types } from 'mongoose'
import { ICourseDocument } from './course.js' // Импортируем тип курса

interface ICartItem {
  count: number
  courseId: Types.ObjectId | ICourseDocument
}

export interface IUser {
  _id?: Types.ObjectId;
  name: string
  email: string
  password?: string
  resetToken?: string
  resetTokenExp?: Date | number
  avatarUrl?: string
  cart: {
    items: ICartItem[]
  }
}

export interface IUserDocument extends IUser, Document {
  addToCart(course: ICourseDocument): Promise<IUserDocument>
  removeFromCart(id: string): Promise<IUserDocument>
  clearCart(): Promise<IUserDocument>
  _id: Types.ObjectId
}