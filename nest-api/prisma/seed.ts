// prisma/seed.ts
// 该脚本用来测试数据库
import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const post1 = await prisma.user.upsert({
    where: { email: 'a' },
    update: {},
    create: {
      email: 'Prisma Adds Support for MongoDB',
      name: 'huaji3123an',
    },
  });

  // const post2 = await prisma.user.upsert({
  //   where: { email: "What's new in Prisma? (Q1/22)" },
  //   update: {},
  //   create: {
  //     email: 'Prisma Adds Support for MongoDB',
  //     name: 'huajian2',
  //   },
  // });

  console.log({ post1 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
