import type { ProductStatePort, CartStatePort, NotificationStatePort, UserStatePort } from '../../../application/ports/out';
import type { Product, ProductFilter, Pagination, ProductsResult } from '../../../domain/product';
import type { Cart } from '../../../domain/cart';
import type { Notification } from '../../../domain/notification';
import type { User } from '../../../domain/user';
import { store, productActions } from './reduxStore';

export class ReduxProductStateAdapter implements ProductStatePort {
  getState() {
    return store.getState().product;
  }
  
  subscribe(listener: () => void): () => void {
    return store.subscribe(listener);
  }
  
  setProducts(result: ProductsResult): void {
    store.dispatch(productActions.setProducts(result));
  }
  
  setCurrentProduct(product: Product | null): void {
    store.dispatch(productActions.setCurrentProduct(product));
  }
  
  setCategories(categories: string[]): void {
    store.dispatch(productActions.setCategories(categories));
  }
  
  setFilter(filter: ProductFilter): void {
    store.dispatch(productActions.setFilter(filter));
  }
  
  setPagination(pagination: Pick<Pagination, 'page' | 'limit'>): void {
    store.dispatch(productActions.setPagination(pagination));
  }
  
  setLoading(loading: boolean): void {
    store.dispatch(productActions.setLoading(loading));
  }
  
  setError(error: string | null): void {
    store.dispatch(productActions.setError(error));
  }
}

export class ReduxCartStateAdapter implements CartStatePort {
  getState(): Cart {
    return store.getState().cart;
  }
  
  subscribe(listener: () => void): () => void {
    return store.subscribe(listener);
  }
}

export class ReduxNotificationStateAdapter implements NotificationStatePort {
  getState(): { notifications: Notification[]; unreadCount: number } {
    return store.getState().notification;
  }
  
  subscribe(listener: () => void): () => void {
    return store.subscribe(listener);
  }
}

export class ReduxUserStateAdapter implements UserStatePort {
  getState(): { user: User | null } {
    return store.getState().user;
  }
  
  subscribe(listener: () => void): () => void {
    return store.subscribe(listener);
  }
}
