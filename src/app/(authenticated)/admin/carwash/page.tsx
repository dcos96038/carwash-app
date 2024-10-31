import { DataTable } from '@/components/data-table';

import { carwashColumns } from './components/columns';
import { CreateCarwashDialog } from './components/create-dialog';
import { getCarwashes, getUsersForCombobox } from './actions';
import { searchParamsCache } from '@/lib/search-params';

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
    <div className="w-full h-full p-10 flex flex-col gap-5">
      <div className="flex">
        <h1 className="font-semibold text-2xl">Carwash List</h1>
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
