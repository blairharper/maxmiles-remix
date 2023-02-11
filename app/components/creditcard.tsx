import { CreditCardIcon } from "@heroicons/react/24/outline";

interface ICreditCardProps {
  creditCard: {
    name: string;
    description: string;
    last4: string;
    expMonth: string;
    expYear: string;
  };
}

export default function CreditCardComponent({ creditCard }: ICreditCardProps) {
  return (
    <>
      <div className="flex w-full items-center justify-between rounded-lg bg-gray-100 p-6 shadow-xl">
        <div className="flex flex-col">
          <div className="text-sm text-gray-600">{creditCard.name}</div>
          <div className="text-sm text-gray-600">{creditCard.description}</div>
          <div className="text-sm text-gray-600">
            **** **** **** {creditCard.last4}
          </div>
          <div className="text-sm text-gray-600">
            {creditCard.expMonth}/{creditCard.expYear}
          </div>
        </div>
        <CreditCardIcon className="h-12 w-12 text-gray-600" />
      </div>
    </>
  );
}
