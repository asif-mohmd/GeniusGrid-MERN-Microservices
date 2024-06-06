import mongoose, { Schema, Document, model } from 'mongoose';

interface IOrder extends Document {
  courseId: mongoose.Types.ObjectId;
  instructorId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  courseName: string;
  courseCategory: string;
  coursePrice: number;
  createdAt: Date;
}

const orderSchema: Schema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  instructorId: {
    type: Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  courseCategory: {
    type: String,
    required: true,
  },
  coursePrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = model<IOrder>('Order', orderSchema);

export default Order;
