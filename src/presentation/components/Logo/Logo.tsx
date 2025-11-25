import React from 'react';

interface LogoProps {
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <div className="logo" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <span className="logo__icon">🛍️</span>
      <span className="logo__text">HexaShop</span>
    </div>
  );
};
