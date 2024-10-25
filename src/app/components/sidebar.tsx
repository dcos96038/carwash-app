'use client';

import type { Carwash } from '@/types/carwash.types';
import { CarFront, LogOutIcon } from 'lucide-react';
import { LocationButton } from './location-button';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SidebarProps {
  locations: Carwash[];
}

export const Sidebar: React.FC<SidebarProps> = ({ locations }) => {
  const session = useSession();

  return (
    <div className="min-w-96 flex flex-col text-gray-200 pt-6 px-4 gap-4">
      <div className="flex gap-1 justify-center items-center">
        <CarFront />
        <h1 className="font-semibold text-xl text-center">Carwash App</h1>
      </div>
      {session.status === 'authenticated' && (
        <div className="flex items-center justify-between">
          <p className="italic text-gray-500 text-sm">
            Logged in as {session.data.user.email}
          </p>
          <Button
            size={'sm'}
            type="button"
            onClick={async () => {
              await signOut();
            }}
            className="flex items-center gap-1"
          >
            Logout <LogOutIcon size={14} />
          </Button>
        </div>
      )}
      <Button asChild>
        <Link href={'/dashboard'}>Dashboard</Link>
      </Button>

      <div className="flex flex-col gap-2">
        {locations.length ? (
          locations.map((l) => <LocationButton key={l.id} location={l} />)
        ) : (
          <div className="text-center text-gray-400">No locations found</div>
        )}
      </div>
    </div>
  );
};
