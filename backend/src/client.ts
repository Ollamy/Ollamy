import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log(`Database connected`);
};

main()
  .catch((e) => {
    throw `Failed to initialize database: ${e}`;
  })
  .finally(async () => {
    await prisma.$disconnect();
  })

export default prisma;