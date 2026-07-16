import { secureApi } from "./config";
import { AxiosResponse } from "axios";

export const researchControllers = {
  getResearchSubmissions: async (
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<AxiosResponse> => {
    try {
      const params: any = { page, limit };
      if (search) {
        params.search = search;
      }
      const result = await secureApi.get(`/research-submissions/all`, {
        params,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
};
