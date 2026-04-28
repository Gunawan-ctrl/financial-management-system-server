export interface UserRecord {
  id?: string;
  username: string;
  email: string;
  password: string;
  role?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryRecord {
  id?: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TransactionRecord {
  id?: string;
  name: string;
}

export interface RequestResponse<T = unknown> {
  code: number;
  status: boolean;
  message: string;
  data?: T;
}

export type IdParams = {
  id: string;
};