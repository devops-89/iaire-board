import { secureApi } from "./config";
import { AxiosResponse } from "axios";

export const dashboardControllers = {
  getBoardAdminDashboard: async (): Promise<AxiosResponse> => {
    try {
      const result = await secureApi.get("/platform/dashboard/board-admin");
      return result;
    } catch (error) {
      throw error;
    }
  },
};
