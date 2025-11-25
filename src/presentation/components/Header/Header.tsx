import type { ReactNode } from 'react';

interface HeaderProps {
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ leftSlot, rightSlot }) => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__left">
          {leftSlot}
        </div>
        <div className="header__right">
          {rightSlot}
        </div>
      </div>
    </header>
  );
};
