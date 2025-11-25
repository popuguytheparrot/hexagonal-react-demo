import { useDI } from './DIProvider';

export function useProductState() {
  const di = useDI();
  return di.productState;
}

export function useCartState() {
  const di = useDI();
  return di.cartState;
}

export function useNotificationState() {
  const di = useDI();
  return di.notificationState;
}

export function useUserState() {
  const di = useDI();
  return di.userState;
}

export function useNavigation() {
  const di = useDI();
  return di.navigation;
}

export function useUrlFilter() {
  const di = useDI();
  return di.urlFilter;
}
