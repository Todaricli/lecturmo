import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    course_dummy_id: String,
    courseName: { type: String },
    lecturer: {
      id: { type: Schema.Types.ObjectId, ref: 'User' },
      dummy: { type: String }
    },
    description: { type: String },
    category: String,
    level: String,
    reviews: [
      {
        user: {
          id: { type: Schema.Types.ObjectId, ref: 'User' },
          dummy: { type: String }
        },
        content: String,
        likes: [{
          user: {
            id: { type: Schema.Types.ObjectId, ref: 'User' },
            dummy: { type: String }
          },
        }],
        difficultyRating: { type: Number, min: 1, max: 5 },
        contentRating: { type: Number, min: 1, max: 5 },
        qualityRating: { type: Number, min: 1, max: 5 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    lectures: [
      {
        title: String,
        lectureDate: { type: Date },
        qrExpiry: String,
        qrCreation: { type: Date, default: Date.now },
      }
    ]
  },
  { timestamps: true },
);

export const Course = mongoose.model('Course', courseSchema);
