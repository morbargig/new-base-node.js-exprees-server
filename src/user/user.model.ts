import * as mongoose from 'mongoose';
import { ValidationError } from '../utils/errors/applicationError';
import { User } from './user.interface';

export const UserSchema: mongoose.Schema = new mongoose.Schema(
  {
    // mongoSchema
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    class: {
      type: String,
    },
    job: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    pass: {
      type: String,
    },
    employId: { type: Number },
    phone: { type: Number },
    rule: {
      type: Array,
      default: new Array(),
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  // {
  //   timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' },
  //   id: true,
  //   versionKey: false,
  //   toJSON: {
  //     virtuals: true,
  //     transform(doc, ret) {
  //       const returnedValue = ret;
  //       // eslint-disable-next-line no-underscore-dangle
  //       delete returnedValue._id;
  //     },
  //   },
  // },
);

UserSchema.post('save', (error: any, doc: any, next: any) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new ValidationError('There was a duplicate key error'));
  } else {
    next();
  }
});

export const UserModel = mongoose.model<User & mongoose.Document>('User', UserSchema);
