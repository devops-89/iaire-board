import { secureApi } from "./config";
import { AxiosResponse } from "axios";

export const teamControllers = {
  getTeamDetails: async (teamId: number): Promise<AxiosResponse> => {
    try {
      const result = await secureApi.get(`/team/${teamId}`);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
