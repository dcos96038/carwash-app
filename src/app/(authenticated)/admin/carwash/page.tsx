import { searchParamsCache } from "@/lib/search-params";

import { DataTable } from "@/components/data-table";

import { getCarwashes, getUsersForCombobox } from "./actions";
import { carwashColumns } from "./components/columns";
import { CreateCarwashDialog } from "./components/create-dialog";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { page, perPage, sorting } = searchParamsCache.parse(searchParams);

  const users = await getUsersForCombobox();
  const carwashes = await getCarwashes({
    page,
    limit: perPage,
    sortBy: sorting,
  });

  return (
    <div className="flex h-full w-full flex-col gap-5 p-10">
      <div className="flex">
        <h1 className="text-2xl font-semibold">Carwash List</h1>
        <CreateCarwashDialog users={users?.data} />
      </div>
      <DataTable
        columns={carwashColumns}
        data={carwashes?.data?.results || []}
        totalItems={carwashes?.data?.totalCount || 0}
      />
    </div>
  );
}
