import { faker } from '@faker-js/faker';
import { Course } from '../../schemas/courseSchema.js';

const NUMBER_OF_COURSES = 5;

export async function createEmptyCourses() {
  const courses = await Promise.all(
    Array.from({ length: NUMBER_OF_COURSES }, () => new Course().save()),
  );
  return courses;
}

export async function populateCourses(users, courses) {
  try {
    const updatedCourses = await Promise.all(
      courses.map(async (course) => {
        // Populate course details
        course.courseName = faker.company.catchPhrase();
        (course.lecturer = faker.helpers.arrayElement(users)._id),
          (course.description = faker.lorem.paragraph());
        course.category = faker.commerce.department();
        course.level = faker.helpers.arrayElement([
          'Bachelor',
          'Postgrad',
          'Masters',
        ]);
        course.price = faker.commerce.price();

        // Create random reviews
        course.reviews = Array.from(
          { length: faker.number.int({ min: 1, max: 5 }) },
          () => ({
            userId: faker.helpers.arrayElement(users)._id, // Random user ID from the fetched users
            content: faker.lorem.sentences(),
            likes: users
              .filter(() => faker.datatype.boolean())
              .map((user) => user._id),
            rating: faker.number.int({ min: 1, max: 5 }),
          }),
        );

        return course.save(); // Save the updated course
      }),
    );
  } catch (error) {
    console.error('Failed to populate courses:', error);
  }
}
