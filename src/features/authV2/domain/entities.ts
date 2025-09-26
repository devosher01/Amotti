export interface User {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  status?: string;
  emailVerified?: boolean;
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;
  sessionId?: string;
  riskScore?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  user: User;
}