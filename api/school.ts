import { secureApi } from "./config";
import { AxiosResponse } from "axios";

export const schoolControllers = {
  getSchools: async (
    boardId: number = 1,
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<AxiosResponse> => {
    try {
      const params: any = { page, limit };
      if (search) {
        params.search = search;
      }
      const result = await secureApi.get(`/boards/${boardId}/schools`, {
        params,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },

  getSchoolDetails: async (schoolId: number): Promise<AxiosResponse> => {
    try {
      const result = await secureApi.get(`/schools/${schoolId}/users`);
      return result;
    } catch (error) {
      throw error;
    }
  },

  getSchoolStats: async (): Promise<AxiosResponse> => {
    try {
      const result = await secureApi.get(`/boards/schools/stats`);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
