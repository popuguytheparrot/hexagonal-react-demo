import type { Store } from '@reduxjs/toolkit';
import type { StatePort, CatalogFilters, PaginationState } from '../../../core/application/ports/state/StatePort';
import type { Product } from '../../../core/domain/product/entities/Product';
import type { CartItem } from '../../../core/domain/cart/entities/CartItem';
import type { Notification } from '../../../core/domain/notification/entities/Notification';
import type { User } from '../../../core/domain/user/entities/User';
import type { RootState } from './store';
import {
  selectProducts,
  selectFilters,
  selectPaginatedProducts,
  selectPagination,
  setFilters,
  setPage,
  resetFilters,
} from './slices/catalogSlice';
import {
  selectCartItems,
  selectCartCount,
  selectCartTotal,
  addToCart,
  removeFromCart,
} from './slices/cartSlice';
import {
  selectNotifications,
  selectUnreadCount,
  markAsRead,
} from './slices/notificationsSlice';
import { selectUser } from './slices/userSlice';

export class ReduxAdapter implements StatePort {
  private store: Store<RootState>;
  
  constructor(store: Store<RootState>) {
    this.store = store;
  }

  // Catalog
  getProducts(): Product[] {
    return selectProducts(this.store.getState());
  }

  getFilteredProducts(): Product[] {
    return selectPaginatedProducts(this.store.getState());
  }

  getFilters(): CatalogFilters {
    return selectFilters(this.store.getState());
  }

  getPagination(): PaginationState {
    return selectPagination(this.store.getState());
  }

  setFilters(filters: Partial<CatalogFilters>): void {
    this.store.dispatch(setFilters(filters));
  }

  setPage(page: number): void {
    this.store.dispatch(setPage(page));
  }

  resetFilters(): void {
    this.store.dispatch(resetFilters());
  }

  // Product
  getProductById(id: string): Product | undefined {
    return this.getProducts().find((p) => p.id === id);
  }

  // Cart
  getCartItems(): CartItem[] {
    return selectCartItems(this.store.getState());
  }

  getCartCount(): number {
    return selectCartCount(this.store.getState());
  }

  getCartTotal(): number {
    return selectCartTotal(this.store.getState());
  }

  addToCart(product: Product): void {
    this.store.dispatch(addToCart(product));
  }

  removeFromCart(productId: string): void {
    this.store.dispatch(removeFromCart(productId));
  }

  // Notifications
  getNotifications(): Notification[] {
    return selectNotifications(this.store.getState());
  }

  getUnreadCount(): number {
    return selectUnreadCount(this.store.getState());
  }

  markNotificationAsRead(id: string): void {
    this.store.dispatch(markAsRead(id));
  }

  // User
  getUser(): User | null {
    return selectUser(this.store.getState());
  }

  // Subscribe to changes
  subscribe(callback: () => void): () => void {
    return this.store.subscribe(callback);
  }
}
