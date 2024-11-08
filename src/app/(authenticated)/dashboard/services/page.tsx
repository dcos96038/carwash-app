import { searchParamsCache } from "@/lib/search-params";

import { DataTable } from "@/components/data-table";

import { getServices, getVehicleTypesForCombobox } from "./actions";
import { serviceColumns } from "./components/columns";
import { CreateServiceDialog } from "./components/create-dialog";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { page, perPage } = searchParamsCache.parse(searchParams);
  const vehicleTypes = await getVehicleTypesForCombobox();
  const services = await getServices({
    limit: perPage,
    page,
  });

  return (
    <div className="flex h-full w-full flex-col gap-5 p-10">
      <div className="flex">
        <h1 className="text-2xl font-semibold">Services List</h1>
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
