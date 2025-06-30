export type Client = {
  id: number;
  full_name: string;
  phone_number: string;
};

export type User = {
  id: number;
  telegram_id: number;
  name: string;
  role: string;
}

export type CreateUser = {
  telegram_id: number | '';
  name: string;
  role: string;
}


export type Price = {
  order_id: number,
  price: number,
  paid: number
}

export interface ClothingType {
  id: number;
  name: string;
}

export  interface Clothing {
  id: number;
  name: string;
}

export  interface MeasureType {
  id: number;
  name: string;
}


export interface Measure {
  id: number;
  name: string;
  value: number;
}

export interface Part {
  clothingId: number;
  name: string;
  measures: Measure[];
}

export interface Order {
  id: number;
  client_id: number;
  clothing_type_id: number;
  due_date: string;
  order_note: string;
  status_id: number;
  created_at: string;
}

export interface OrderResponse {
  total: number;
  orders: Order[]
}

export interface MeasureResponse {
    order_id: number;
    measure_id: number; 
    measure: number;
    clothing_id: number;
}

export interface OrderDetail{
  order_id: number;
  style: number;
  fabric: number;
  color:number;
} 
