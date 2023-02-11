import { Form } from "@remix-run/react";
import { Link } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/server-runtime";
import { createCard } from "~/models/cards.server";
import { requireUserId } from "~/session.server";
import { json, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

export const action = async ({ request, params }: ActionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();

  const brand = formData.get("brand");
  const name = formData.get("name");
  const last4 = formData.get("last4");
  const expMonth = formData.get("expMonth");
  const expYear = formData.get("expYear");

  // TODO: show the errors on the form
  const errors = {
    brand: !brand ? "Brand is required" : null,
    name: !name ? "Name is required" : null,
    last4: !last4 ? "Last 4 digits is required" : null,
    expMonth: !expMonth ? "Expiry month is required" : null,
    expYear: !expYear ? "Expiry year is required" : null,
  };

  const hasErrors = Object.values(errors).some((error) => error);

  if (hasErrors) {
    return json(errors);
  }

  invariant(typeof brand === "string", "Brand must be a string");
  invariant(typeof name === "string", "Name must be a string");
  invariant(typeof last4 === "string", "Last 4 digits must be a string");
  invariant(typeof expMonth === "string", "Expiry month must be a string");
  invariant(typeof expYear === "string", "Expiry year must be a string");

  await createCard(
    userId,
    brand,
    name,
    last4,
    parseInt(expMonth),
    parseInt(expYear)
  );

  return redirect("/my-cards");
};

export default function NewCardRoute() {
  return (
    <Form method="post" className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 sm:space-y-5">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              New Credit Card
            </h3>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Brand
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <div className="flex max-w-lg rounded-md shadow-sm">
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    autoComplete="brand"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Name
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  id="name"
                  name="name"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="last4"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Last 4 digits
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  id="last4"
                  name="last4"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="expMonth"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Expiry
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <div className="flex flex-shrink flex-row divide-x-2 rounded-md shadow-sm">
                  <input
                    type="number"
                    name="expMonth"
                    id="expMonth"
                    autoComplete="expMonth"
                    className="block w-0.5 min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <input
                    type="number"
                    name="expYear"
                    id="expYear"
                    autoComplete="expYear"
                    className="block w-0.5 min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <Link
            to="/my-cards"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </Form>
  );
}
