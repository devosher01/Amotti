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

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}