import { useUserState } from '../../../infrastructure/di';
import { useStatePort } from '../../shared/hooks';
import type { User } from '../../../domain/user';
import './ProfileWidget.css';

export function ProfileWidget() {
  const userState = useUserState();
  const state = useStatePort<{ user: User | null }>(userState);
  const user = state.user;
  
  if (!user) {
    return (
      <div className="profile-widget profile-widget-empty">
        <div className="profile-avatar-placeholder">?</div>
        <span>Sign In</span>
      </div>
    );
  }
  
  return (
    <div className="profile-widget">
      {user.avatarUrl ? (
        <img src={user.avatarUrl} alt={user.name} className="profile-avatar" />
      ) : (
        <div className="profile-avatar-placeholder">
          {user.name.charAt(0).toUpperCase()}
        </div>
      )}
      <span className="profile-name">{user.name}</span>
    </div>
  );
}
