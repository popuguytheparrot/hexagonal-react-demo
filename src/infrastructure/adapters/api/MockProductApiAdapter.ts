import type { ProductApiPort } from '../../../application/ports/out';
import type { Product, ProductFilter, Pagination, ProductsResult } from '../../../domain/product';

const mockProducts: Product[] = [
  { id: '1', name: 'Wireless Headphones', description: 'Premium wireless headphones with noise cancellation', price: 199.99, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/headphones/300/300' },
  { id: '2', name: 'Running Shoes', description: 'Lightweight running shoes for marathon training', price: 129.99, category: 'Sports', imageUrl: 'https://picsum.photos/seed/shoes/300/300' },
  { id: '3', name: 'Coffee Maker', description: 'Automatic drip coffee maker with timer', price: 79.99, category: 'Home', imageUrl: 'https://picsum.photos/seed/coffee/300/300' },
  { id: '4', name: 'Laptop Stand', description: 'Ergonomic aluminum laptop stand', price: 49.99, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/laptop/300/300' },
  { id: '5', name: 'Yoga Mat', description: 'Non-slip yoga mat with carrying strap', price: 34.99, category: 'Sports', imageUrl: 'https://picsum.photos/seed/yoga/300/300' },
  { id: '6', name: 'Desk Lamp', description: 'LED desk lamp with adjustable brightness', price: 45.99, category: 'Home', imageUrl: 'https://picsum.photos/seed/lamp/300/300' },
  { id: '7', name: 'Bluetooth Speaker', description: 'Portable waterproof bluetooth speaker', price: 89.99, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/speaker/300/300' },
  { id: '8', name: 'Fitness Tracker', description: 'Smart fitness tracker with heart rate monitor', price: 149.99, category: 'Sports', imageUrl: 'https://picsum.photos/seed/tracker/300/300' },
  { id: '9', name: 'Air Purifier', description: 'HEPA air purifier for medium rooms', price: 199.99, category: 'Home', imageUrl: 'https://picsum.photos/seed/purifier/300/300' },
  { id: '10', name: 'Mechanical Keyboard', description: 'RGB mechanical gaming keyboard', price: 129.99, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/keyboard/300/300' },
  { id: '11', name: 'Tennis Racket', description: 'Professional tennis racket with case', price: 159.99, category: 'Sports', imageUrl: 'https://picsum.photos/seed/tennis/300/300' },
  { id: '12', name: 'Blender', description: 'High-speed blender for smoothies', price: 99.99, category: 'Home', imageUrl: 'https://picsum.photos/seed/blender/300/300' },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class MockProductApiAdapter implements ProductApiPort {
  async fetchProducts(filter: ProductFilter, pagination: Pick<Pagination, 'page' | 'limit'>): Promise<ProductsResult> {
    await delay(500);
    
    let filtered = [...mockProducts];
    
    if (filter.category) {
      filtered = filtered.filter(p => p.category === filter.category);
    }
    if (filter.minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= filter.minPrice!);
    }
    if (filter.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= filter.maxPrice!);
    }
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower)
      );
    }
    
    const total = filtered.length;
    const start = (pagination.page - 1) * pagination.limit;
    const products = filtered.slice(start, start + pagination.limit);
    
    return {
      products,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total
      }
    };
  }
  
  async fetchProductById(id: string): Promise<Product | null> {
    await delay(300);
    return mockProducts.find(p => p.id === id) || null;
  }
  
  async fetchCategories(): Promise<string[]> {
    await delay(200);
    return [...new Set(mockProducts.map(p => p.category))];
  }
}
