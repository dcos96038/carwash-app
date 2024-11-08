import { PlusCircle } from "lucide-react";
import Link from "next/link";

import { searchParamsCache } from "@/lib/search-params";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";

import { getCarwashes } from "./actions";
import { carwashColumns } from "./components/columns";

export default async function Page(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const { page, perPage, sorting } = searchParamsCache.parse(searchParams);

  const carwashes = await getCarwashes({
    page,
    limit: perPage,
    sortBy: sorting,
  });

  return (
    <div className="flex h-full w-full flex-col gap-5 p-10">
      <div className="flex">
        <h1 className="text-2xl font-semibold">Carwash List</h1>
        <Button className="ml-auto" size={"sm"} asChild>
          <Link href="/admin/carwash/create">
            <PlusCircle className="ml-2" /> Create Carwash
          </Link>
        </Button>
      </div>
      <DataTable
        columns={carwashColumns}
        data={carwashes?.data?.results || []}
        totalItems={carwashes?.data?.totalCount || 0}
      />
    </div>
  );
}
