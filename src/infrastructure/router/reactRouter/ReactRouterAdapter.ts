import type { NavigateFunction, Location } from 'react-router-dom';
import type { RouterPort, NavigateOptions } from '../../../core/application/ports/router/RouterPort';

export class ReactRouterAdapter implements RouterPort {
  private navigateFn: NavigateFunction;
  private location: Location;
  private setSearchParamsFn: (params: URLSearchParams, options?: { replace?: boolean }) => void;

  constructor(
    navigateFn: NavigateFunction,
    location: Location,
    setSearchParamsFn: (params: URLSearchParams, options?: { replace?: boolean }) => void
  ) {
    this.navigateFn = navigateFn;
    this.location = location;
    this.setSearchParamsFn = setSearchParamsFn;
  }

  navigate(path: string, options?: NavigateOptions): void {
    this.navigateFn(path, { replace: options?.replace });
  }

  goBack(): void {
    this.navigateFn(-1);
  }

  getCurrentPath(): string {
    return this.location.pathname;
  }

  getParams<T extends Record<string, string | undefined>>(): T {
    // Params are extracted from the URL path by react-router
    // This is a simplified version - in real usage, you'd pass params from useParams()
    return {} as T;
  }

  getSearchParams(): URLSearchParams {
    return new URLSearchParams(this.location.search);
  }

  getSearchParam(key: string): string | null {
    const params = new URLSearchParams(this.location.search);
    return params.get(key);
  }

  setSearchParams(params: Record<string, string | null>, options?: NavigateOptions): void {
    const currentParams = new URLSearchParams(this.location.search);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === '') {
        currentParams.delete(key);
      } else {
        currentParams.set(key, value);
      }
    });
    
    this.setSearchParamsFn(currentParams, { replace: options?.replace ?? true });
  }

  setSearchParam(key: string, value: string | null, options?: NavigateOptions): void {
    this.setSearchParams({ [key]: value }, options);
  }

  isActive(path: string): boolean {
    return this.location.pathname === path;
  }
}
