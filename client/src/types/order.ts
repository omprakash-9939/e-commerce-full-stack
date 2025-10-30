
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  size: string;
  paymentMethod: string;
  date: number;
  status: string;
  payment: string;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  status: string;
  payment: string;
  paymentMethod: string;
  date: number;
  amount:number
}

export interface orderItems{
   id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  size: string;
  paymentMethod: string;
  date: number;
  status: string;
  payment: string;
}


export interface CartOrderItem {
  _id: string;        
  name: string;
  price: number;
  image: string | string[];
  size: string;
  quantity: number;
}
