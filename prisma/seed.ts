import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "blair@wheelhouse.software";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("Password1!", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });
  await prisma.creditCard.create({
    data: {
      name: "Gold Card",
      brand: "American Express",
      last4: "1234",
      expMonth: 12,
      expYear: 2023,
      userId: user.id,
    },
  });

  await prisma.creditCard.create({
    data: {
      name: "Avios Plus",
      brand: "Barclays",
      last4: "5002",
      expMonth: 3,
      expYear: 2026,
      userId: user.id,
    },
  });

  await prisma.creditCard.create({
    data: {
      name: "Premier Banking",
      brand: "HSBC",
      last4: "4698",
      expMonth: 1,
      expYear: 2028,
      userId: user.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
