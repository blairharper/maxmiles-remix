import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CreditCardComponent from "~/components/creditcard";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "@remix-run/react";
import { getCreditCardsByUserId } from "~/models/cards.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const cards = await getCreditCardsByUserId(userId);
  return json({ cards });
};

export default function CardsIndex() {
  const { cards } = useLoaderData<typeof loader>();
  return (
    <div>
      <div className="mb-6">
        <Link to="new">
          <PlusCircleIcon className="h-6 w-6 text-emerald-500 hover:text-emerald-600" />
        </Link>
      </div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.length === 0 && (
          <p className="text-gray-800">
            No cards. Click the "+" button to add some.
          </p>
        )}
        {cards.map((card) => (
          <li key={card.id}>
            <CreditCardComponent creditCard={card} />
          </li>
        ))}
      </ul>
    </div>
  );
}
