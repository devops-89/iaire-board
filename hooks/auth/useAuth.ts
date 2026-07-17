"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  login as loginAction,
  logout as logoutAction,
  updateUser as updateUserAction,
} from "@/redux/slices/authSlice";
import { authControllers } from "@/api/auth";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuthenticated, token } = useSelector(
    (state: any) =>
      state.auth || { user: null, isAuthenticated: false, token: null },
  );

  const login = async (values: any) => {
    const response = await authControllers.login({
      email: values.email,
      password: values.password,
    });

    const accessToken =
      response.data?.data?.tokens?.accessToken ||
      response.data?.data?.access_token ||
      response.data?.token ||
      response.data?.data?.token ||
      response.data?.result?.token;

    if (accessToken) {
      localStorage.setItem("token", accessToken);
      let userData = response.data?.data?.user || response.data?.user || null;

      if (!userData && accessToken) {
        try {
          const decoded: any = jwtDecode(accessToken);
          userData = {
            id: String(decoded.id || decoded.sub || decoded.userId || ""),
            name: decoded.name || "User",
            email: decoded.email || values.email,
            role: decoded.role || "admin",
            avatar: decoded.avatar || "/images/profile.png",
          };
        } catch (e) {
          console.error("Failed to decode token", e);
        }
      }

      if (userData) {
        dispatch(loginAction({ user: userData, token: accessToken }));
        return { success: true, user: userData };
      }
    }
    return {
      success: false,
      message: "Invalid credentials or missing user data",
    };
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(logoutAction());
    router.push("/");
  };

  const updateUser = (data: any) => {
    dispatch(updateUserAction(data));
  };

  const fetchUserDetails = async () => {
    try {
      const response = await authControllers.getUserDetails();
      if (response?.data && response.data.success) {
        const userData = response.data.data;
        const name = userData.fullName || `${userData.firstName || ""} ${userData.lastName || ""}`.trim() || "User";
        const mappedUser = {
          ...userData,
          id: String(userData.id),
          name: name,
          avatar: userData.profileImageDownloadUrl || userData.profileImage || "",
        };
        dispatch(loginAction({ user: mappedUser, token: localStorage.getItem("token") || "" }));
        return { success: true, user: mappedUser };
      }
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
    return { success: false };
  };

  return {
    user,
    isAuthenticated,
    token,
    login,
    logout,
    updateUser,
    fetchUserDetails,
  };
};
