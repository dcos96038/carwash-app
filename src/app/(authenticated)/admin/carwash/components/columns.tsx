"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Carwash } from "@/types/carwash.types";

export const carwashColumns: ColumnDef<Carwash>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "coords",
    header: "Coords",
    enableSorting: false,
    cell: ({ row }) => (
      <span>
        {row.original.latitude}, {row.original.longitude}
      </span>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "contactNumber",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
