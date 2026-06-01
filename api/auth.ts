import { publicApi, secureApi } from "./config";
import { AxiosResponse } from "axios";

export const authControllers: any = {
  login: async (data: any): Promise<AxiosResponse> => {
    try {
      const result = await publicApi.post("/auth/login", {
        identifier: data.email,
        password: data.password,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  selfRegisterBoardAdmin: async (formData: FormData): Promise<AxiosResponse> => {
    try {
      const result = await publicApi.post("/users/self-register-board-admin", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  verifyEmailOtp: async (data: { email: string; otp: string }): Promise<AxiosResponse> => {
    try {
      const result = await publicApi.post("/auth/verify-email", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  changePassword: async (data: { oldPassword: string; newPassword: string }): Promise<AxiosResponse> => {
    try {
      const result = await secureApi.patch("/auth/change-password", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  forgotPassword: async (email: string): Promise<AxiosResponse> => {
    try {
      const result = await publicApi.post("/auth/forgot-password", {
        identifier: email,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  resetPassword: async (data: { email: string; otp: string; newPassword: string }): Promise<AxiosResponse> => {
    try {
      const result = await publicApi.patch("/auth/reset-password", {
        identifier: data.email,
        otp: data.otp,
        newPassword: data.newPassword,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  getCountries: async (): Promise<AxiosResponse> => {
    try {
      const result = await publicApi.get("/countries/dropdown");
      return result;
    } catch (error) {
      throw error;
    }
  },
  resendOtp: async (email: string): Promise<AxiosResponse> => {
    try {
      const result = await publicApi.post("/auth/resend-otp", {
        email: email,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
};