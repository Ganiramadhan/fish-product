export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    image: string;
    description: string;
    benefits: string;
    nutritionalInfo: string;
    origin: string;
    cookingSuggestions: string;
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }
  