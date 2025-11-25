export interface NavigateOptions {
  replace?: boolean;
}

export interface RouterPort {
  navigate(path: string, options?: NavigateOptions): void;
  goBack(): void;
  getCurrentPath(): string;
  getParams<T extends Record<string, string | undefined>>(): T;
  getSearchParams(): URLSearchParams;
  getSearchParam(key: string): string | null;
  setSearchParams(params: Record<string, string | null>, options?: NavigateOptions): void;
  setSearchParam(key: string, value: string | null, options?: NavigateOptions): void;
  isActive(path: string): boolean;
}
