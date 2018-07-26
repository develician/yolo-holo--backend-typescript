import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface Account extends mongoose.Document {
  profile: {
    username: string;
    thumbnail: string;
  };
  email: string;
  social: {
    facebook: {
      id: string;
      accessToken: string;
      displayName: string;
    };
  };
  password: string;
  createdAt: Date;
}

export const Account: any = new Schema({
  profile: {
    username: String,
    thumbnail: {
      type: String,
      default: '/static/images/default_thumbnail.png',
    },
  },
  email: {
    type: String,
  },
  social: {
    facebook: {
      id: String,
      accessToken: String,
      displayName: String,
    },
  },
  password: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model<Account>('Account', Account);
