import { ApiResponse } from "@/types/api";
import { Dashboard } from "@/types/dashboard";
import proxyApi from "./axiosProxyClient";

export const getAllDashboardData = async (): Promise<ApiResponse<Dashboard>> => {
  try {
    const { data } = await proxyApi.get<ApiResponse<Dashboard>>(`/dashboard`);
    return data;
  } catch (error: any) {
    if (error.response?.data) return error.response.data;

    return {
      success: false,
      message: 'Network error or server is unreachable',
      data: {
        categories: 0,
        subCategories: 0,
        products: 0
      },
    };
  }
}