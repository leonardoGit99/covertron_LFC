import { LoginDTO } from "@/types/auth";
import api from "./axiosProxyClient";
import { TokenPayload } from "@/types/token";
import { ApiResponse } from "@/types/api";
import proxyApi from "./axiosProxyClient";

export const login = async (body: LoginDTO): Promise<number> => {
  const { status } = await proxyApi.post<Promise<void>>(`/login`, body);
  return status;
}

export const getCurrentUser = async (): Promise<ApiResponse<TokenPayload>> => {
  const { data } = await proxyApi.get<ApiResponse<TokenPayload>>(`/me`);
  return data;
}