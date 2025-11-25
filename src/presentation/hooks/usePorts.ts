import { useContext, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PortsContext } from '../providers/PortsContext';
import type { Ports } from '../providers/PortsContext';
import type { Product } from '../../core/domain/product/entities/Product';
import type { CatalogFilters, PaginationState } from '../../core/application/ports/state/StatePort';
import type { CartItem } from '../../core/domain/cart/entities/CartItem';
import type { Notification } from '../../core/domain/notification/entities/Notification';
import type { User } from '../../core/domain/user/entities/User';
import type { RootState } from '../../infrastructure/state/redux/store';
import {
  selectFilters,
  selectPaginatedProducts,
  selectPagination,
  setFilters as setFiltersAction,
  setPage as setPageAction,
  resetFilters as resetFiltersAction,
} from '../../infrastructure/state/redux/slices/catalogSlice';
import {
  selectCartItems,
  selectCartCount,
  selectCartTotal,
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
} from '../../infrastructure/state/redux/slices/cartSlice';
import {
  selectNotifications,
  selectUnreadCount,
} from '../../infrastructure/state/redux/slices/notificationsSlice';
import { selectUser } from '../../infrastructure/state/redux/slices/userSlice';

// Main hook to access ports (for router functionality)
export const usePorts = (): Ports => {
  const ports = useContext(PortsContext);
  if (!ports) {
    throw new Error('usePorts must be used within AppProviders');
  }
  return ports;
};

// Catalog hooks
export const useCatalogProducts = (): Product[] => {
  return useSelector((state: RootState) => selectPaginatedProducts(state));
};

export const useCatalogFilters = (): CatalogFilters => {
  return useSelector((state: RootState) => selectFilters(state));
};

export const usePagination = (): PaginationState => {
  return useSelector((state: RootState) => selectPagination(state));
};

// Cart hooks
export const useCartItems = (): CartItem[] => {
  return useSelector((state: RootState) => selectCartItems(state));
};

export const useCartCount = (): number => {
  return useSelector((state: RootState) => selectCartCount(state));
};

export const useCartTotal = (): number => {
  return useSelector((state: RootState) => selectCartTotal(state));
};

// Notifications hooks
export const useNotifications = (): Notification[] => {
  return useSelector((state: RootState) => selectNotifications(state));
};

export const useUnreadNotifications = (): number => {
  return useSelector((state: RootState) => selectUnreadCount(state));
};

// User hooks
export const useUser = (): User | null => {
  return useSelector((state: RootState) => selectUser(state));
};

// Product hooks
export const useProduct = (id: string): Product | undefined => {
  return useSelector((state: RootState) => {
    return state.catalog.products.find((p) => p.id === id);
  });
};

// Action hooks
export interface CatalogActions {
  setFilters: (filters: Partial<CatalogFilters>) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

export const useCatalogActions = (): CatalogActions => {
  const dispatch = useDispatch();
  const { routerPort } = usePorts();
  
  const setFilters = useCallback(
    (filters: Partial<CatalogFilters>) => {
      dispatch(setFiltersAction(filters));
      dispatch(setPageAction(1));
      
      // Sync to URL
      const urlParams: Record<string, string | null> = {};
      
      // Get updated filters after dispatch
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          urlParams[key] = String(value);
        } else {
          urlParams[key] = null;
        }
      });
      urlParams.page = null; // Reset page on filter change
      
      routerPort.setSearchParams(urlParams, { replace: true });
    },
    [dispatch, routerPort]
  );
  
  const setPage = useCallback(
    (page: number) => {
      dispatch(setPageAction(page));
      routerPort.setSearchParam('page', page > 1 ? String(page) : null, { replace: true });
    },
    [dispatch, routerPort]
  );
  
  const resetFilters = useCallback(
    () => {
      dispatch(resetFiltersAction());
      routerPort.setSearchParams({
        category: null,
        minPrice: null,
        maxPrice: null,
        search: null,
        inStock: null,
        page: null,
      }, { replace: true });
    },
    [dispatch, routerPort]
  );
  
  return useMemo(
    () => ({ setFilters, setPage, resetFilters }),
    [setFilters, setPage, resetFilters]
  );
};

export interface CartActions {
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
}

export const useCartActions = (): CartActions => {
  const dispatch = useDispatch();
  
  const addToCart = useCallback(
    (product: Product) => {
      if (product.inStock) {
        dispatch(addToCartAction(product));
      }
    },
    [dispatch]
  );
  
  const removeFromCart = useCallback(
    (productId: string) => {
      dispatch(removeFromCartAction(productId));
    },
    [dispatch]
  );
  
  return useMemo(
    () => ({ addToCart, removeFromCart }),
    [addToCart, removeFromCart]
  );
};

// Router hooks
export const useNavigateToProduct = () => {
  const { routerPort } = usePorts();
  
  return useCallback(
    (productId: string) => {
      routerPort.navigate(`/product/${productId}`);
    },
    [routerPort]
  );
};

export const useGoBack = () => {
  const { routerPort } = usePorts();
  
  return useCallback(
    () => {
      routerPort.goBack();
    },
    [routerPort]
  );
};

export const useNavigateToCatalog = () => {
  const { routerPort } = usePorts();
  
  return useCallback(
    () => {
      routerPort.navigate('/');
    },
    [routerPort]
  );
};
