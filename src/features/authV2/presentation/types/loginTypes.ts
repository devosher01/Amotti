export interface LoginPageProps {}

export interface RegisterPageProps {}

export interface SecurityBadgeProps {
  readonly isDark: boolean;
}

export interface LoginError {
  readonly response?: {
    readonly status?: number;
    readonly data?: {
      readonly message?: string;
    };
  };
  readonly message?: string;
}

