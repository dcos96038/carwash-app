import { searchParamsCache } from '@/lib/search-params';
import { getServices, getVehicleTypesForCombobox } from './actions';
import { CreateServiceDialog } from './components/create-dialog';
import { DataTable } from '@/components/data-table';
import { serviceColumns } from './components/columns';

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { pagination } = searchParamsCache.parse(searchParams);
  const vehicleTypes = await getVehicleTypesForCombobox();
  const services = await getServices({
    limit: pagination.pageSize,
    page: pagination.pageIndex,
  });

  return (
    <div className="w-full h-full p-10 flex flex-col gap-5">
      <div className="flex">
        <h1 className="font-semibold text-2xl">Services List</h1>
        <CreateServiceDialog vehicleTypes={vehicleTypes?.data} />
      </div>
      <DataTable
        columns={serviceColumns}
        data={services?.data?.results || []}
        totalItems={services?.data?.totalCount || 0}
      />
    </div>
  );
}
