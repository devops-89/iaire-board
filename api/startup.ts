import { secureApi } from "./config";
import { AxiosResponse } from "axios";

export const startupControllers = {
  getStartups: async (
    page: number = 1,
    limit: number = 1000,
    search?: string
  ): Promise<AxiosResponse> => {
    try {
      const params: any = { page, limit };
      if (search) {
        params.search = search;
      }
      const result = await secureApi.get(`/startup/all`, {
        params,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
};
