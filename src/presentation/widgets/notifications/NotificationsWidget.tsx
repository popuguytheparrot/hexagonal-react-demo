import { useNotificationState } from '../../../infrastructure/di';
import { useStatePort } from '../../shared/hooks';
import { Badge } from '../../shared/components';
import type { Notification } from '../../../domain/notification';
import './NotificationsWidget.css';

export function NotificationsWidget() {
  const notificationState = useNotificationState();
  const state = useStatePort<{ notifications: Notification[]; unreadCount: number }>(notificationState);
  
  return (
    <div className="notifications-widget">
      <div className="notifications-icon">
        🔔
        <Badge count={state.unreadCount} />
      </div>
    </div>
  );
}
