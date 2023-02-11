import type { CreditCard } from "@prisma/client";
import { prisma } from "~/db.server";
export type { CreditCard } from "@prisma/client";

export async function getCreditCardsByUserId(userId: CreditCard["userId"]) {
  const cards = await prisma.creditCard.findMany({
    where: {
      userId,
    },
  });

  return cards;
}

export async function createCard(
  userId: CreditCard["userId"],
  name: CreditCard["name"],
  brand: CreditCard["brand"],
  last4: CreditCard["last4"],
  expMonth: CreditCard["expMonth"],
  expYear: CreditCard["expYear"]
) {
  return prisma.creditCard.create({
    data: {
      name,
      brand,
      last4,
      expMonth,
      expYear,
      userId,
    },
  });
}
