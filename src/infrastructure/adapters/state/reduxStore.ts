import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductFilter, Pagination, ProductsResult } from '../../../domain/product';
import type { Cart } from '../../../domain/cart';
import type { Notification } from '../../../domain/notification';
import type { User } from '../../../domain/user';

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  categories: string[];
  filter: ProductFilter;
  pagination: Pagination;
  loading: boolean;
  error: string | null;
}

const initialProductState: ProductState = {
  products: [],
  currentProduct: null,
  categories: [],
  filter: {},
  pagination: { page: 1, limit: 6, total: 0 },
  loading: false,
  error: null
};

const productSlice = createSlice({
  name: 'product',
  initialState: initialProductState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductsResult>) => {
      state.products = action.payload.products;
      state.pagination = action.payload.pagination;
    },
    setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
      state.currentProduct = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setFilter: (state, action: PayloadAction<ProductFilter>) => {
      state.filter = action.payload;
    },
    setPagination: (state, action: PayloadAction<Pick<Pagination, 'page' | 'limit'>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

type CartState = Cart;

const initialCartState: CartState = {
  items: [
    { productId: '1', quantity: 2 },
    { productId: '3', quantity: 1 }
  ],
  totalItems: 3
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {}
});

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}

const initialNotificationState: NotificationState = {
  notifications: [
    { id: '1', title: 'New Sale!', message: '50% off on electronics', read: false, createdAt: new Date() },
    { id: '2', title: 'Order Shipped', message: 'Your order #123 has been shipped', read: false, createdAt: new Date() },
    { id: '3', title: 'Welcome!', message: 'Welcome to our store', read: true, createdAt: new Date() }
  ],
  unreadCount: 2
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialNotificationState,
  reducers: {}
});

interface UserState {
  user: User | null;
}

const initialUserState: UserState = {
  user: {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatarUrl: 'https://picsum.photos/seed/user/100/100'
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {}
});

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    cart: cartSlice.reducer,
    notification: notificationSlice.reducer,
    user: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['notification.notifications'],
        ignoredActions: ['notification/setNotifications']
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const productActions = productSlice.actions;
export const cartActions = cartSlice.actions;
export const notificationActions = notificationSlice.actions;
export const userActions = userSlice.actions;
