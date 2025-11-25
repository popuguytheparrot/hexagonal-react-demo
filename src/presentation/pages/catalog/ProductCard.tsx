import type { Product } from '../../../domain/product';
import { Card } from '../../shared/components';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card className="product-card" onClick={onClick}>
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="product-card-image"
      />
      <div className="product-card-content">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-description">{product.description}</p>
        <span className="product-card-price">${product.price.toFixed(2)}</span>
      </div>
    </Card>
  );
}
