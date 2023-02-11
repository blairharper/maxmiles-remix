import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import CreditCardComponent from "~/components/creditcard";

export const loader = async () => {
  const cards = [
    {
      id: 1,
      name: "Card 1",
      description: "Card 1 description",
      last4: "1234",
      expMonth: "12",
      expYear: "2020",
    },
    {
      id: 2,
      name: "Card 2",
      description: "Card 2 description",
      last4: "5678",
      expMonth: "12",
      expYear: "2020",
    },
    {
      id: 3,
      name: "Card 3",
      description: "Card 3 description",
      last4: "9012",
      expMonth: "12",
      expYear: "2020",
    },
  ];
  return json({ cards });
};

export default function CardsRoute() {
  const { cards } = useLoaderData<typeof loader>();
  return (
    <div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards?.map((card) => (
          <li key={card.id}>
            <CreditCardComponent creditCard={card} />
          </li>
        ))}
      </ul>
    </div>
  );
}
