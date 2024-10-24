import { MapProvider } from '@/context/use-map';
import type { PropsWithChildren } from 'react';

import { auth, BASE_PATH } from '@/auth';
import SessionProvider from './session-provider';
import { Toaster } from './ui/sonner';

export const AppProviders = async ({ children }: PropsWithChildren) => {
  const session = await auth();

  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      <MapProvider>{children}</MapProvider>
      <Toaster />
    </SessionProvider>
  );
};
