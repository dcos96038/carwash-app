import { getUsersForCombobox } from "../actions";
import { getCarwashById } from "./actions";
import { UpdateCarwashForm } from "./update-carwash-form";

export default async function Page({
  params,
}: {
  params: Promise<{ carwashId: string }>;
}) {
  const { carwashId } = await params;

  const [users, carwash] = await Promise.all([
    getUsersForCombobox(),
    getCarwashById({ id: carwashId }),
  ]);

  if (!users || !carwash?.data) {
    throw new Error("Failed to fetch data");
  }

  return (
    <div className="flex size-full flex-col gap-6 p-10">
      <h1>Edit Carwash</h1>
      <UpdateCarwashForm users={users?.data} carwash={carwash.data} />
    </div>
  );
}
