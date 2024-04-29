import { faker } from '@faker-js/faker';
import { User } from '../../schemas/userSchema.js';
import { hashPassword } from '../../utils/useBcrypt.js'

const NUMBER_OF_USERS = 10;
const PASSWORD = '123'

export async function createEmptyUsers() {
  try {
    const users = await Promise.all(
      Array.from({ length: NUMBER_OF_USERS }, async () => {
        const hashedPassword = await hashPassword(PASSWORD);

        return new User({
          username: faker.internet.userName(),
          password: hashedPassword,
          email: faker.internet.email(),
        }).save();
      })
    );
    return users;
  } catch (error) {
    console.error('Failed to create users:', error);
    throw error;
  }
}

export async function populateUsers(users, courses) {
  try {
    // Map over existing users and update them
    const updatedUsers = await Promise.all(users.map(async (user, index) => {
      // Assign courses randomly
      const userCourses = courses.map(course => ({
        courseId: course._id,
        attendanceCount: faker.number.int({ min: 1, max: 100 })
      })).filter(() => faker.datatype.boolean());

      // Populate user details
      user.name = faker.person.fullName();
      user.username = `user${index + 1}`;
      // user.password = "123";
      user.email = faker.internet.email();
      user.rank = faker.helpers.arrayElement(['Beginner', 'Intermediate', 'Advanced']);
      user.profileDescription = faker.lorem.sentence();
      user.avatarPicture = faker.image.avatar();
      user.isVerified = faker.datatype.boolean();
      user.roles = ['student', 'lecturer', 'admin'].filter(() => faker.datatype.boolean());
      user.courses = userCourses;

      return user.save();
    }));
  } catch (error) {
    console.error('Failed to populate users:', error);
  }
}
