import { useSyncExternalStore, useCallback } from 'react';
import type { StatePort } from '../../../application/ports/out';

export function useStatePort<T>(statePort: StatePort<T>): T {
  const subscribe = useCallback(
    (onStoreChange: () => void) => statePort.subscribe(onStoreChange),
    [statePort]
  );
  
  const getSnapshot = useCallback(
    () => statePort.getState(),
    [statePort]
  );
  
  return useSyncExternalStore(subscribe, getSnapshot);
}

export function useSelector<T, R>(statePort: StatePort<T>, selector: (state: T) => R): R {
  const subscribe = useCallback(
    (onStoreChange: () => void) => statePort.subscribe(onStoreChange),
    [statePort]
  );
  
  const getSnapshot = useCallback(
    () => selector(statePort.getState()),
    [statePort, selector]
  );
  
  return useSyncExternalStore(subscribe, getSnapshot);
}
