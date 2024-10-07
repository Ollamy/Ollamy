export interface LoginRequest {
  email: string;
  password: string;
  platform: 'MOBILE';
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  platform: 'MOBILE';
}
