// src/components/ClientOnlyComponent.tsx
'use client';

import { ReactNode } from 'react';
import useLenis from '../hooks/useLenis';

const ClientOnlyComponent = ({ children }: { children: ReactNode }) => {
  useLenis();

  return <>{children}</>;
};

export default ClientOnlyComponent;
