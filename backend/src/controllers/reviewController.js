import { Course } from "../schemas/courseSchema";

export const addReview = async (courseId, reviewData) => {
    try {
        const review = await Course.findByIdAndUpdate(
            courseId,
            { $push: { reviews: reviewData } },
            { new: true }
        );
        if (!review) {
            throw new Error(`Course with ID ${courseId} not found`);
        }
        return review;
    } catch (error) {
        console.error(error);
        return null;
    }
};
