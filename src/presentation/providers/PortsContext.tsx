import { createContext } from 'react';
import type { StatePort } from '../../core/application/ports/state/StatePort';
import type { RouterPort } from '../../core/application/ports/router/RouterPort';

export interface Ports {
  statePort: StatePort;
  routerPort: RouterPort;
}

export const PortsContext = createContext<Ports | null>(null);
