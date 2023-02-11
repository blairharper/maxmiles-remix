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
