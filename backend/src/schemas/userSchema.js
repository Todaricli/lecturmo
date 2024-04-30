import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  rank: String,
  profileDescription: String,
  avatarPicture: String,
  isVerified: Boolean,
  roles: [{ type: String }], //(student, lecturer, admin)
  courses: [{
    courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
    attendanceCount: Number
  }],
  isVerified: {type: Boolean, default: false, required: true},
  emailToken: {type: String, default: null}
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
