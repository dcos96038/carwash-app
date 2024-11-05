import { getUsersForCombobox } from "../actions";
import { CreateCarwashForm } from "./create-carwash-form";

export default async function Page() {
  const users = await getUsersForCombobox();

  return (
    <div className="flex size-full flex-col gap-6 p-10">
      <h1 className="text-2xl font-semibold">Create Carwash</h1>

      <CreateCarwashForm users={users?.data} />
    </div>
  );
}
