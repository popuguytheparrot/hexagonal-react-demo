import React from 'react';
import type { Product } from '../../../../core/domain/product/entities/Product';
import { useNavigateToProduct, useCartActions } from '../../../hooks/usePorts';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigateToProduct = useNavigateToProduct();
  const { addToCart } = useCartActions();

  const handleCardClick = () => {
    navigateToProduct(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card hoverable onClick={handleCardClick} className="product-card">
      <div className="product-card__image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-card__image"
        />
        {!product.inStock && (
          <div className="product-card__out-of-stock">Out of Stock</div>
        )}
      </div>
      <div className="product-card__content">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__rating">
          {'⭐'.repeat(Math.floor(product.rating))} {product.rating.toFixed(1)}
        </div>
        <div className="product-card__footer">
          <span className="product-card__price">${product.price.toFixed(2)}</span>
          <Button 
            size="small" 
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};
