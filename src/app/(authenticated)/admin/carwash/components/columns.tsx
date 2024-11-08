"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";

import { Carwash } from "@/types/carwash.types";

import { Button } from "@/components/ui/button";

export const carwashColumns: ColumnDef<Carwash>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-3">
          <Button size="icon" className="size-7" asChild>
            <Link href={`/admin/carwash/${row.original.id}`}>
              <Edit />
            </Link>
          </Button>
          {/* <Button size="icon" className="size-7">
            <Trash />
          </Button> */}
        </div>
      );
    },
  },
];
