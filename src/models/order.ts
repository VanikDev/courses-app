// model Order for working with MongoDB
import { Schema, model } from 'mongoose'
import { IOrderDocument } from '#/types/order.js'

const orderSchema = new Schema<IOrderDocument>({
  courses: [
    {
      course: {
        type: Object,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    name: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  date: {
    type: Date,
    default: Date.now(),
  },
})

export default model<IOrderDocument>('Order', orderSchema)
