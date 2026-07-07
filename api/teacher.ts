import { secureApi } from "./config";
import { AxiosResponse } from "axios";

export const teacherControllers = {
  getTeachers: async (
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<AxiosResponse> => {
    try {
      const params: any = { role: "TEACHER", page, limit };
      if (search) {
        params.search = search;
      }
      const result = await secureApi.get(`/users/all`, {
        params,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },

  getTeacherDetails: async (userId: number): Promise<AxiosResponse> => {
    try {
      const result = await secureApi.get(`/users/details/${userId}`);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
