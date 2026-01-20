
export enum Operator {
  VODACOM = 'Vodacom',
  MOVITEL = 'Movitel',
  TMCEL = 'Tmcel'
}

export enum OrderStatus {
  PENDING = 'Pendente',
  DELIVERED = 'Entregue',
  CANCELLED = 'Cancelado'
}

export interface Package {
  id: string;
  name: string;
  operator: Operator;
  validity: string;
  price: number;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  referralCode: string;
  referredBy?: string;
  referralPurchasesCount: number; // Quantas compras os amigos indicados fizeram
  referralsCount: number; // Quantas pessoas indicou
}

export interface Order {
  id: string;
  userId: string;
  targetNumber: string;
  packageId: string;
  packageName: string;
  operator: Operator;
  price: number;
  transactionId: string;
  status: OrderStatus;
  timestamp: number;
}

export type Screen = 'SPLASH' | 'AUTH_LOGIN' | 'AUTH_REGISTER' | 'HOME' | 'BUY' | 'PAYMENT' | 'CONFIRMATION' | 'HISTORY' | 'ADMIN_LOGIN' | 'ADMIN_DASHBOARD';
