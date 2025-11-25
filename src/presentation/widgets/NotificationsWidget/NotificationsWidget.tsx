import React from 'react';
import { useUnreadNotifications } from '../../hooks/usePorts';

export const NotificationsWidget: React.FC = () => {
  const unreadCount = useUnreadNotifications();

  return (
    <div className="notifications-widget">
      <span className="notifications-widget__icon">🔔</span>
      {unreadCount > 0 && (
        <span className="notifications-widget__badge">{unreadCount}</span>
      )}
    </div>
  );
};
