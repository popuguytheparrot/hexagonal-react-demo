import React from 'react';
import { useUser } from '../../hooks/usePorts';

export const ProfileWidget: React.FC = () => {
  const user = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className="profile-widget">
      <img 
        src={user.avatar} 
        alt={user.name} 
        className="profile-widget__avatar"
      />
      <span className="profile-widget__name">{user.name}</span>
    </div>
  );
};
