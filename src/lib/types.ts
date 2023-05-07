export type User = {
  username: string;
  password?: string;
  status: boolean;
  balance: number;
}

export type TokenResponse = {
  access: string;
  refresh: string;
}
