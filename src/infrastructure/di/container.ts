import type { GetProductsPort, GetProductByIdPort, GetCategoriesPort, NavigationPort, UrlFilterPort } from '../../application/ports/in';
import type { ProductApiPort, ProductStatePort, CartStatePort, NotificationStatePort, UserStatePort } from '../../application/ports/out';
import { GetProductsUseCase, GetProductByIdUseCase, GetCategoriesUseCase } from '../../application/use-cases/product';
import { MockProductApiAdapter } from '../adapters/api';
import { ReduxProductStateAdapter, ReduxCartStateAdapter, ReduxNotificationStateAdapter, ReduxUserStateAdapter } from '../adapters/state';
import { ReactRouterNavigationAdapter, UrlFilterAdapter } from '../adapters/navigation';

export interface DIContainer {
  productApi: ProductApiPort;
  productState: ProductStatePort;
  cartState: CartStatePort;
  notificationState: NotificationStatePort;
  userState: UserStatePort;
  navigation: NavigationPort;
  urlFilter: UrlFilterPort;
  getProducts: GetProductsPort;
  getProductById: GetProductByIdPort;
  getCategories: GetCategoriesPort;
}

export const navigationAdapter = new ReactRouterNavigationAdapter();

export function createDIContainer(): DIContainer {
  const productApi = new MockProductApiAdapter();
  const productState = new ReduxProductStateAdapter();
  const cartState = new ReduxCartStateAdapter();
  const notificationState = new ReduxNotificationStateAdapter();
  const userState = new ReduxUserStateAdapter();
  const urlFilter = new UrlFilterAdapter(navigationAdapter);
  
  const getProducts = new GetProductsUseCase(productApi, productState);
  const getProductById = new GetProductByIdUseCase(productApi, productState);
  const getCategories = new GetCategoriesUseCase(productApi, productState);
  
  return {
    productApi,
    productState,
    cartState,
    notificationState,
    userState,
    navigation: navigationAdapter,
    urlFilter,
    getProducts,
    getProductById,
    getCategories
  };
}
