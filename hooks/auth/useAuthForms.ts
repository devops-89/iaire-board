"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { authControllers } from "@/api/auth";
import { useAuth } from "@/hooks/auth/useAuth";
import {
  loginValidationSchema,
  forgotPasswordValidationSchema,
  verifyOtpValidationSchema,
  resetPasswordValidationSchema,
} from "@/utils/validation";

export type AuthView =
  | "LOGIN"
  | "FORGOT_EMAIL"
  | "FORGOT_OTP"
  | "FORGOT_NEW_PASSWORD";

export const useAuthForms = () => {
  const [view, setView] = useState<AuthView>("LOGIN");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const router = useRouter();
  const auth = useAuth();

  const [timer, setTimer] = useState(0);

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const startTimer = () => {
    setTimer(60);
  };

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search);
      const currentViewParam = currentParams.get("view");
      if (currentViewParam === "forgot-email") {
        setView("FORGOT_EMAIL");
      } else if (currentViewParam === "forgot-otp") {
        setView("FORGOT_OTP");
      } else if (currentViewParam === "reset-password") {
        setView("FORGOT_NEW_PASSWORD");
      } else {
        setView("LOGIN");
      }
    };

    // Sync initial state on mount (handles page reload/direct link)
    handlePopState();

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleViewChange = (newView: AuthView) => {
    loginFormik.resetForm();
    forgotEmailFormik.resetForm();
    otpFormik.resetForm();
    resetPasswordFormik.resetForm();
    setView(newView);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (newView === "LOGIN") {
        params.delete("view");
      } else if (newView === "FORGOT_EMAIL") {
        params.set("view", "forgot-email");
      } else if (newView === "FORGOT_OTP") {
        params.set("view", "forgot-otp");
      } else if (newView === "FORGOT_NEW_PASSWORD") {
        params.set("view", "reset-password");
      }
      const newRelativePathQuery =
        window.location.pathname +
        (params.toString() ? "?" + params.toString() : "");
      window.history.pushState(null, "", newRelativePathQuery);
    }
  };

  const getErrorMessage = (error: any) => {
    const data = error.response?.data;
    const message = data?.message || "";
    const errors = data?.errors || [];
    const allErrorsStr = [message, ...errors].join(" ").toLowerCase();
    const hasEmailError =
      allErrorsStr.includes("email") || allErrorsStr.includes("identifier");
    const hasPasswordError = allErrorsStr.includes("password");
    if (hasEmailError && hasPasswordError) return "Incorrect email or password";
    if (hasEmailError) return "Incorrect email";
    if (hasPasswordError) return "Incorrect password";
    return message || "Login failed.";
  };

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const result = await auth.login(values);
        if (result.success) {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("login_success_alert", "true");
          }
          router.replace("/dashboard");
        } else {
          setSnackbar({
            open: true,
            message: getErrorMessage({
              response: { data: { message: result.message, errors: [] } },
            }),
            severity: "error",
          });
        }
      } catch (error: any) {
        setSnackbar({
          open: true,
          message: getErrorMessage(error),
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const forgotEmailFormik = useFormik({
    initialValues: { email: "" },
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // If your login API does not support these, we placeholder them or define them in authControllers
        if (authControllers.forgotPassword) {
          await authControllers.forgotPassword(values.email);
        }
        setForgotEmail(values.email);
        startTimer();
        setSnackbar({
          open: true,
          message: "OTP sent to your email!",
          severity: "success",
        });
        handleViewChange("FORGOT_OTP");
      } catch (error: any) {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Failed to send OTP.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const otpFormik = useFormik({
    initialValues: { otp: "" },
    validationSchema: verifyOtpValidationSchema,
    onSubmit: async (values) => {
      setOtp(values.otp);
      handleViewChange("FORGOT_OTP");
    },
  });

  const handleResendOTP = async () => {
    if (!forgotEmail) {
      setSnackbar({
        open: true,
        message: "Email not found. Please go back and try again.",
        severity: "error",
      });
      return;
    }
    setLoading(true);
    try {
      if (authControllers.resendOtp) {
        await authControllers.resendOtp(forgotEmail, "PASSWORD_RESET");
      }
      startTimer();
      setSnackbar({
        open: true,
        message: "A new OTP has been sent to your email!",
        severity: "success",
      });
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to resend OTP.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetPasswordFormik = useFormik({
    initialValues: { otp: "", password: "", confirmPassword: "" },
    validationSchema: resetPasswordValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        if (authControllers.resetPassword) {
          await authControllers.resetPassword(
            forgotEmail,
            values.otp,
            values.password,
          );
        }
        setSnackbar({
          open: true,
          message: "Password reset successful! Please login.",
          severity: "success",
        });
        setTimeout(() => {
          handleViewChange("LOGIN");
        }, 1500);
      } catch (error: any) {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Failed to reset password.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const requirements = [
    {
      met: resetPasswordFormik.values.password.length >= 6,
      text: "Minimum Characters 6",
    },
    {
      met: /[A-Z]/.test(resetPasswordFormik.values.password),
      text: "One Uppercase Character",
    },
    {
      met: /[a-z]/.test(resetPasswordFormik.values.password),
      text: "One Lowercase Character",
    },
    {
      met: /[!@#$%^&*(),.?":{}|<> ]/.test(resetPasswordFormik.values.password),
      text: "One Special Character",
    },
    {
      met: /[0-9]/.test(resetPasswordFormik.values.password),
      text: "One Number",
    },
  ];

  return {
    view,
    setView,
    showPassword,
    setShowPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    loading,
    snackbar,
    handleCloseSnackbar,
    loginFormik,
    forgotEmailFormik,
    otpFormik,
    handleResendOTP,
    resetPasswordFormik,
    requirements,
    setForgotEmail,
    setSnackbar,
    handleViewChange,
    timer,
    canResend: timer === 0,
  };
};
