import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    course_dummy_id: String,
    courseName: { type: String },
    courseCode: { type: String },
    totalAttendance: { type: Number, default: 0 },
    lecturerId: { type: Schema.Types.ObjectId, ref: 'User' },
    dummyLecId: String,
    description: { type: String },
    category: String,
    level: String,
    reviews: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        dummyId: String,
        content: String,
        likes: [
          {
            userId: { type: Schema.Types.ObjectId, ref: 'User' },
          },
        ],
        dummyLikes: [String],
        difficultyRating: { type: Number, min: 1, max: 5 },
        contentRating: { type: Number, min: 1, max: 5 },
        qualityRating: { type: Number, min: 1, max: 5 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
   
    lectures: [{
      // lectureId: {type: String, unique:true, },
      lectureName: {type:String},
      attendence: {type: Number, default: 0},
      date: {type:String},
      qrDuration: {type:Number, default: 15},
      qrCreationTime: String
    }]
  },
  { timestamps: true },
);

export const Course = mongoose.model('Course', courseSchema);
