export type ApiResponse<T =undefined> = {
  success: boolean;
  data?: T;
  message: string;
  errors?: unknown;
};