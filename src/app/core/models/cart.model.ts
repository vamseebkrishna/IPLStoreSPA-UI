export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  franchiseName: string;
  type: string;
  unitPrice: number;
  quantity: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
}
