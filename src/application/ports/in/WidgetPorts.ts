import type { Cart } from '../../../domain/cart';
import type { Notification } from '../../../domain/notification';
import type { User } from '../../../domain/user';

export interface GetCartPort {
  execute(): Cart;
}

export interface GetNotificationsPort {
  execute(): Notification[];
}

export interface GetUnreadNotificationsCountPort {
  execute(): number;
}

export interface GetUserPort {
  execute(): User | null;
}
