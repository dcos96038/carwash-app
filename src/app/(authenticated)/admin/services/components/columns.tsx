'use client';

import { Service } from '@/types/services.types';
import { ColumnDef } from '@tanstack/react-table';

export const serviceColumns: ColumnDef<Service>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'vehicleType',
    header: 'Vehicle Type',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];
