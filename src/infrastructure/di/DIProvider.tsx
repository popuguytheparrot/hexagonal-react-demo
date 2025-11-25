/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { createDIContainer, type DIContainer } from './container';

const DIContext = createContext<DIContainer | null>(null);

interface DIProviderProps {
  children: ReactNode;
  container?: DIContainer;
}

export function DIProvider({ children, container }: DIProviderProps) {
  const di = useMemo(() => container || createDIContainer(), [container]);
  
  return (
    <DIContext.Provider value={di}>
      {children}
    </DIContext.Provider>
  );
}

export function useDI(): DIContainer {
  const context = useContext(DIContext);
  if (!context) {
    throw new Error('useDI must be used within a DIProvider');
  }
  return context;
}
