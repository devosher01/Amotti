// shared/types/common.ts
export type UniqueId = string;
export type Email = string;
export type DateTimeString = string; // ISO 8601
export type Timestamp = number;
export type Currency = 'USD' | 'EUR' | 'GBP';

export type Money = {
  amount: number; // En centavos/centimos
  currency: Currency;
};

export type ApiResponse<T> = {
  data: T;
  status: 'success' | 'error';
  message?: string;
  success: boolean;
};

export type PaginationMeta = {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
};
