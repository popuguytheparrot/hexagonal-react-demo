import { useCartState } from '../../../infrastructure/di';
import { useStatePort } from '../../shared/hooks';
import { Badge } from '../../shared/components';
import type { Cart } from '../../../domain/cart';
import './CartWidget.css';

export function CartWidget() {
  const cartState = useCartState();
  const state = useStatePort<Cart>(cartState);
  
  return (
    <div className="cart-widget">
      <div className="cart-icon">
        🛒
        <Badge count={state.totalItems} />
      </div>
    </div>
  );
}
