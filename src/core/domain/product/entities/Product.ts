export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'electronics' | 'clothing' | 'home';
  image: string;
  rating: number;
  inStock: boolean;
}
