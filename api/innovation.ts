import { secureApi } from "./config";
import { AxiosResponse } from "axios";

export const innovationControllers = {
  getInnovations: async (
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<AxiosResponse> => {
    try {
      const params: any = { page, limit };
      if (search) {
        params.search = search;
      }
      const result = await secureApi.get(`/innovations/all`, {
        params,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },

  getInnovationDetails: async (id: string | number): Promise<AxiosResponse> => {
    try {
      const result = await secureApi.get(`/innovations/${id}`);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
