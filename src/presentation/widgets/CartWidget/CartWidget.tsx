import React from 'react';
import { useCartCount } from '../../hooks/usePorts';

export const CartWidget: React.FC = () => {
  const cartCount = useCartCount();

  return (
    <div className="cart-widget">
      <span className="cart-widget__icon">🛒</span>
      {cartCount > 0 && (
        <span className="cart-widget__badge">{cartCount}</span>
      )}
    </div>
  );
};
