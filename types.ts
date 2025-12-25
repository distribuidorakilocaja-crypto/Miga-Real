
export enum SandwichType {
  CLASSIC = 'Clásico',
  SPECIAL = 'Especial'
}

export interface Flavor {
  id: string;
  name: string;
  type: SandwichType;
}

export interface OrderItem {
  id: string;
  promoId?: string;
  flavors: { flavorId: string; quantity: number }[];
  totalSandwiches: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerType: 'B2C' | 'B2B';
  items: OrderItem[];
  shippingZone: string;
  shippingCost: number;
  discount: number;
  total: number;
  status: 'pending' | 'preparing' | 'delivered';
  createdAt: string;
}

export interface CashEntry {
  id: string;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  description: string;
  category: string;
  timestamp: string;
}

export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  ratioPerSandwich: number; // in grams or units
}
