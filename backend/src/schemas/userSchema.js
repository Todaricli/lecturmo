import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_dummy_id: String,
  name: String,
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  rank: { type: String, enum: ['none', 'bronze', 'silver', 'gold'], default: 'none' },
  profileDescription: String,
  avatarPicture: String,
  roles: { type: String, enum: ['student', 'lecturer', 'admin'], default: 'student' },
  courses: [{
    courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
    dummyId: { String },
    lecturesAttended: [{ lecture: { type: String, index: true } }]
  }],
  isVerified: { type: Boolean, default: false, required: true },
  emailToken: { type: String, default: null }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
