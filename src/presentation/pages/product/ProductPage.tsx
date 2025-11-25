import { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDI, useProductState } from '../../../infrastructure/di';
import { useStatePort } from '../../shared/hooks';
import type { Product, ProductFilter, Pagination } from '../../../domain/product';
import { Button, Loader } from '../../shared/components';
import './ProductPage.css';

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  categories: string[];
  filter: ProductFilter;
  pagination: Pagination;
  loading: boolean;
  error: string | null;
}

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const di = useDI();
  const productState = useProductState();
  const state = useStatePort<ProductState>(productState);
  
  useEffect(() => {
    if (id) {
      di.getProductById.execute(id);
    }
  }, [id, di.getProductById]);
  
  const handleBackClick = useCallback(() => {
    navigate('/');
  }, [navigate]);
  
  if (state.loading) {
    return (
      <div className="product-page-loading">
        <Loader size="large" />
      </div>
    );
  }
  
  if (state.error) {
    return (
      <div className="product-page-error">
        <p>Error: {state.error}</p>
        <Button onClick={handleBackClick}>Back to Catalog</Button>
      </div>
    );
  }
  
  const product = state.currentProduct;
  
  if (!product) {
    return (
      <div className="product-page-not-found">
        <h2>Product not found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <Button onClick={handleBackClick}>Back to Catalog</Button>
      </div>
    );
  }
  
  return (
    <div className="product-page">
      <button className="back-button" onClick={handleBackClick}>
        ← Back to Catalog
      </button>
      
      <div className="product-details">
        <div className="product-image-container">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="product-image"
          />
        </div>
        
        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h1 className="product-name">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          
          <div className="product-price-section">
            <span className="product-price">${product.price.toFixed(2)}</span>
          </div>
          
          <div className="product-actions">
            <Button variant="primary" size="large">
              Add to Cart
            </Button>
            <Button variant="outline" size="large">
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
