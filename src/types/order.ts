import {  Types } from 'mongoose'

export interface IOrderCourse {
  course: {
    title: string
    price: number
    img?: string
    id?: string
  }
  count: number
}

export interface IOrder {
  courses: IOrderCourse[]
  user: {
    name: string
    userId: Types.ObjectId
  }
  date: Date
}

export interface IOrderDocument extends IOrder, Document {}