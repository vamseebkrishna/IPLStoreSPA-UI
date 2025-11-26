export interface OrderItem {
  productId: number;
  productName: string;
  franchiseName: string;
  type: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  id: number;
  userId: string;
  orderDate: string;
  totalAmount: number;
  items: OrderItem[];
}
