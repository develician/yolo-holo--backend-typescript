import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface Plan extends mongoose.Document {
  username: string;
  title: string;
  departDate: Date;
  arriveDate: Date;
  numberOfDays: Number;
  selectedDateArray: Date[];
  createdAt: Date;
}

export const Plan: any = new Schema({
  username: String,
  title: String,
  departDate: Date,
  arriveDate: Date,
  numberOfDays: Number,
  selectedDateArray: [Date],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model<Plan>('Plan', Plan);
