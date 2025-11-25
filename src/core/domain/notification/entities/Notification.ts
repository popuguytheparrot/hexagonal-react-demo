export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string; // ISO date string for Redux serialization
}
