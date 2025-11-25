import type { ReactNode } from 'react';
import './Header.css';

interface HeaderProps {
  logo?: ReactNode;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  onLogoClick?: () => void;
}

export function Header({ logo, leftSlot, rightSlot, onLogoClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="header-logo" onClick={onLogoClick}>
          {logo || <span className="header-logo-text">Store</span>}
        </div>
        {leftSlot && <div className="header-left-slot">{leftSlot}</div>}
      </div>
      {rightSlot && <div className="header-right">{rightSlot}</div>}
    </header>
  );
}
