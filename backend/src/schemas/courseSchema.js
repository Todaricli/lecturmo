import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    course_dummy_id: String,
    courseName: { type: String },
    courseCode: { type: String },
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
    lectures: [
      {
        lectureName: String,
        lectureDate: { type: Date },
        qrExpiry: String,
        qrCreation: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

export const Course = mongoose.model('Course', courseSchema);
