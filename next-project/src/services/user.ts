import { LoginDTO } from "@/types/auth";
import api from "./axios";
import { TokenPayload } from "@/types/token";
import { ApiResponse } from "@/types/api";

export const login = async (body: LoginDTO): Promise<number> => {
  const { status } = await api.post<Promise<void>>(`/login`, body);
  return status;
}

export const getCurrentUser = async (): Promise<ApiResponse<TokenPayload>> => {
  const { data } = await api.get<ApiResponse<TokenPayload>>(`/me`);
  return data;
}