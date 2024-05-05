import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    rank: String,
    profileDescription: String,
    avatarPicture: String,
    isVerified: Boolean,
    roles: String, //(student, lecturer, admin)
    courses: [
      {

        smthg: String,
        courseId: String,
        lectures: [{

        }]
      },
    ]
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
