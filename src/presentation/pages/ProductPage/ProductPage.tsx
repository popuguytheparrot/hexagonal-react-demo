import React from 'react';
import { useParams } from 'react-router-dom';
import { useProduct, useGoBack, useCartActions, useNavigateToCatalog } from '../../hooks/usePorts';
import { Button } from '../../components/ui/Button';

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = useProduct(id || '');
  const goBack = useGoBack();
  const navigateToCatalog = useNavigateToCatalog();
  const { addToCart } = useCartActions();

  if (!product) {
    return (
      <div className="product-page product-page--not-found">
        <h1>Product Not Found</h1>
        <p>The product you're looking for doesn't exist.</p>
        <Button onClick={navigateToCatalog}>Back to Catalog</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-page">
      <Button variant="outline" onClick={goBack} className="product-page__back">
        ← Back to Catalog
      </Button>
      
      <div className="product-page__content">
        <div className="product-page__image-container">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-page__image"
          />
          {!product.inStock && (
            <div className="product-page__out-of-stock">Out of Stock</div>
          )}
        </div>
        
        <div className="product-page__details">
          <span className="product-page__category">{product.category}</span>
          <h1 className="product-page__name">{product.name}</h1>
          
          <div className="product-page__rating">
            {'⭐'.repeat(Math.floor(product.rating))} 
            <span className="product-page__rating-value">{product.rating.toFixed(1)}</span>
          </div>
          
          <p className="product-page__description">{product.description}</p>
          
          <div className="product-page__price">${product.price.toFixed(2)}</div>
          
          <div className="product-page__stock">
            {product.inStock ? (
              <span className="product-page__stock--available">✓ In Stock</span>
            ) : (
              <span className="product-page__stock--unavailable">✗ Out of Stock</span>
            )}
          </div>
          
          <div className="product-page__actions">
            <Button 
              size="large" 
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
