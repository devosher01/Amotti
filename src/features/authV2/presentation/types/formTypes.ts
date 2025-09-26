export type { LoginCredentials } from "../hooks/useAuth";

export interface LoginFormData {
  readonly email: string;
  readonly password: string;
  readonly rememberDevice: boolean;
}

export interface LoginFormErrors {
  readonly email?: string;
  readonly password?: string;
}
