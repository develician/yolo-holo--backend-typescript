import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface DetailPlan extends mongoose.Document {
  planId: string;
  username: string;
  day: number;
  destName: string;
  latitude: number;
  longitude: number;
  placeId: string;
  todoList: string[];
  googleMapEnabled: boolean;
  createdAt: Date;
}

export const DetailPlan: any = new Schema({
  planId: String,
  username: String,
  day: Number,
  destName: String,
  latitude: Number,
  longitude: Number,
  placeId: String,
  todoList: [String],
  googleMapEnabled: Boolean,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model<DetailPlan>('DetailPlan', DetailPlan);
