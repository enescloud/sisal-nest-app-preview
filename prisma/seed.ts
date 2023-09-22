import { PrismaClient } from '@prisma/client'; // We already aware this error but it's ok because this is a  seed script file and out of the scope of the project
import { hash, genSalt } from 'bcryptjs';

async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt();
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}

const prisma = new PrismaClient();
/**
 * The main function creates a new user with the specified email, hashed password, role, and type using
 * the Prisma ORM and logs the created user object to the console.
 */
async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'admin@sisal.com',
      password: await hashPassword('iLoveSisal'),
      role: 'admin_superAdmin',
      type: 'admin',
    },
  });
  console.log('User created sucessfully:', user);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
