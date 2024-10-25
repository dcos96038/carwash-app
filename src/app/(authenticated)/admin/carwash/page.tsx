import { DataTable } from '@/components/data-table';
import { Carwash } from '@/types/carwash.types';
import { carwashColumns } from './components/columns';
import { CreateCarwashDialog } from './components/create-dialog';
import { getUsersForCombobox } from './actions';

const mockData: Carwash[] = [
  {
    id: '1',
    owner_id: 'owner1',
    name: 'Carwash 1',
    address: '1234 Main St',
    latitude: 40.7128,
    longitude: -74.006,
    contactNumber: '123-456-7890',
    openingHours: '08:00',
    closingHours: '20:00',
    email: 'test1@test.com',
    logo: 'logo1.png',
    status: 'open',
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    id: '2',
    owner_id: 'owner2',
    name: 'Carwash 2',
    address: '5678 Elm St',
    latitude: 34.0522,
    longitude: -118.2437,
    contactNumber: '987-654-3210',
    openingHours: '09:00',
    closingHours: '21:00',
    email: 'test2@test.com',
    logo: 'logo2.png',
    status: 'closed',
    createdAt: new Date(),
    updatedAt: null,
  },
];

export default async function Page() {
  const users = await getUsersForCombobox();

  return (
    <div className="w-full h-full p-10 flex flex-col gap-5">
      <div className="flex">
        <h1 className="font-semibold text-2xl">Carwash List</h1>
        <CreateCarwashDialog users={users?.data} />
      </div>
      <DataTable columns={carwashColumns} data={mockData} />
    </div>
  );
}
