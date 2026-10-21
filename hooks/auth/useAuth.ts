import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import {
  login as loginAction,
  logout as logoutAction,
  updateUser as updateUserAction,
} from "@/redux/slices/authSlice";
import { authControllers } from "@/api/auth";
import { jwtDecode } from "jwt-decode";

let isFetchingDetails = false;
let hasFetchedDetails = false;

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, token } = useSelector(
    (state: any) =>
      state.auth || { user: null, isAuthenticated: false, token: null },
  );

  const fetchUserDetails = async () => {
    if (isFetchingDetails) return { success: false };
    isFetchingDetails = true;
    try {
      const response = await authControllers.getUserDetails();
      hasFetchedDetails = true;
      if (response?.data && response.data.success) {
        const userData = response.data.data;
        const name =
          userData.fullName ||
          `${userData.firstName || ""} ${userData.lastName || ""}`.trim() ||
          "User";
        const avatarUrl =
          userData.profileImageDownloadUrl ||
          userData.profile_image_download_url ||
          userData.profileImageDownloadPath ||
          userData.profile_image_download_path ||
          userData.avatar ||
          (typeof userData.profileImage === "string"
            ? userData.profileImage
            : "") ||
          "";
        const mappedUser = {
          ...userData,
          id: String(userData.id),
          name: name,
          avatar: avatarUrl,
          profileImageDownloadUrl: avatarUrl,
        };
        dispatch(
          loginAction({
            user: mappedUser,
            token: localStorage.getItem("token") || "",
          }),
        );
        return { success: true, user: mappedUser };
      }
    } catch (error) {
      hasFetchedDetails = true;
      console.error("Failed to fetch user details", error);
    } finally {
      isFetchingDetails = false;
    }
    return { success: false };
  };

  useEffect(() => {
    const isAuthPage =
      pathname === "/" ||
      pathname === "/signup" ||
      pathname?.startsWith("/forgot-password") ||
      pathname?.startsWith("/verify-otp") ||
      pathname?.startsWith("/reset-password");

    if (isAuthPage) return;

    const storedToken =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (storedToken && !user && !hasFetchedDetails && !isFetchingDetails) {
      fetchUserDetails();
    }
  }, [user, pathname]);

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
      try {
        const detailsRes = await fetchUserDetails();
        if (detailsRes?.success && detailsRes?.user) {
          return { success: true, user: detailsRes.user };
        }
      } catch (e) {
        console.error("Failed to fetch user details on login", e);
      }

      let userData = response.data?.data?.user || response.data?.user || null;

      if (!userData && accessToken) {
        try {
          const decoded: any = jwtDecode(accessToken);
          userData = {
            id: String(decoded.id || decoded.sub || decoded.userId || ""),
            name: decoded.name || "User",
            email: decoded.email || values.email,
            role: decoded.role || "admin",
            avatar: decoded.avatar || "/images/default-avatar.svg",
            profileImageDownloadUrl:
              decoded.avatar || "/images/default-avatar.svg",
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
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      sessionStorage.clear();
    }
    hasFetchedDetails = false;
    isFetchingDetails = false;
    dispatch(logoutAction());
    if (typeof window !== "undefined") {
      window.location.href = "/";
    } else {
      router.push("/");
    }
  };

  const updateUser = (data: any) => {
    dispatch(updateUserAction(data));
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
