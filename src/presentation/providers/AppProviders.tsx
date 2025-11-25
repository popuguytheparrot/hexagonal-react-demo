import React, { useMemo } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { store } from '../../infrastructure/state/redux/store';
import { ReduxAdapter } from '../../infrastructure/state/redux/ReduxAdapter';
import { ReactRouterAdapter } from '../../infrastructure/router/reactRouter/ReactRouterAdapter';
import { PortsContext } from './PortsContext';
import type { Ports } from './PortsContext';

// Create a single statePort instance outside of components
const statePort = new ReduxAdapter(store);

interface PortsProviderProps {
  children: React.ReactNode;
}

const PortsProvider: React.FC<PortsProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();

  const ports: Ports = useMemo(() => {
    const routerPort = new ReactRouterAdapter(navigate, location, setSearchParams);
    return { statePort, routerPort };
  }, [navigate, location, setSearchParams]);

  return (
    <PortsContext.Provider value={ports}>
      {children}
    </PortsContext.Provider>
  );
};

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <PortsProvider>
          {children}
        </PortsProvider>
      </BrowserRouter>
    </ReduxProvider>
  );
};
