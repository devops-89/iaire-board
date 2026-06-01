"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert,
} from "@mui/material";
import { FontSizes, FontWeights, LineHeights } from "@/utils/style";
import { Colors } from "@/utils/enum";
import { useRouter } from "next/navigation";
import { authControllers } from "@/api/auth";
import {
  Business as SchoolIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Public as WorldIcon,
  Groups as GroupIcon,
} from "@mui/icons-material";
import { Poppins } from "@/utils/font";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  JurisdictionStep,
  AuthorityStep,
  StatisticsStep,
  AccountStep,
} from "./RegistrationSteps";

const steps = ["Jurisdiction", "Authority", "Statistics", "Account"];

const validationSchemas = [
  // Step 0: Jurisdiction
  Yup.object({
    country: Yup.string().required("Country is required"),
    board: Yup.string().when("country", ([country], schema) => {
      return country === "India"
        ? schema.required("Board selection is required")
        : schema.optional();
    }),
    boardCode: Yup.string().when("country", ([country], schema) => {
      return country === "India"
        ? schema.required("Board code is required")
        : schema.optional();
    }),
    state: Yup.string().when("country", ([country], schema) => {
      return country === "India" || country === "US" || country === "United States"
        ? schema.required("State is required")
        : schema.optional();
    }),
    city: Yup.string().when("country", ([country], schema) => {
      return country === "US" || country === "United States"
        ? schema.required("City is required")
        : schema.optional();
    }),
    isdName: Yup.string().when("country", ([country], schema) => {
      return country === "US" || country === "United States"
        ? schema.required("ISD is required")
        : schema.optional();
    }),
  }),
  // Step 1: Authority
  Yup.object({
    authorities: Yup.array()
      .of(
        Yup.object({
          role: Yup.string().required("Role is required"),
          name: Yup.string().min(3, "Name too short").required("Required"),
          email: Yup.string().email("Invalid email").required("Required"),
          phone: Yup.string().required("Required"),
        }),
      )
      .min(1, "At least one authority is required"),
  }),
  // Step 2: Statistics
  Yup.object({
    totalSchools: Yup.number()
      .typeError("Must be a number")
      .required("Required"),
    totalStudents: Yup.number()
      .typeError("Must be a number")
      .required("Required"),
    totalTeachers: Yup.number()
      .typeError("Must be a number")
      .required("Required"),
  }),
  // Step 3: Account
  Yup.object({
    loginEmail: Yup.string()
      .email("Invalid email")
      .required("Login email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
  }),
];

export const RegistrationForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [countries, setCountries] = useState<any[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await authControllers.getCountries();
        const list = response.data?.data?.data || response.data?.data || [];
        const filtered = list.filter((c: any) => {
          const name = (c.name || "").toLowerCase();
          return name === "india" || name === "united states" || name === "us";
        });
        setCountries(filtered);
      } catch (err) {
        console.error("Failed to load countries list", err);
      }
    };
    fetchCountries();
  }, []);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const formik = useFormik({
    initialValues: {
      country: "",
      board: "",
      boardCode: "",
      state: "",
      city: "",
      isdName: "",
      otherBoard: "",
      authorities: [{ role: "", name: "", email: "", phone: "" }],
      totalSchools: "",
      totalStudents: "",
      totalTeachers: "",
      spocName: "",
      spocEmail: "",
      spocPhone: "",
      loginEmail: "",
      password: "",
    },
    validationSchema: validationSchemas[activeStep],
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();
        const selectedCountryObj = countries.find(
          (c: any) => c.name === values.country,
        );
        const countryId = selectedCountryObj
          ? String(selectedCountryObj.id)
          : values.country === "India"
            ? "11"
            : "1";
        const countryCode =
          selectedCountryObj?.phoneCode ||
          (values.country === "India" ? "+91" : "+1");

        formData.append("countryId", countryId);

        const authorityDetails = values.authorities.map((auth: any) => ({
          AuthorityFullName: auth.name,
          AuthorityEmail: auth.email,
          AuthorityPhone: auth.phone,
          AuthorityCountryCode: countryCode,
          AuthorityRole: (auth.role || "").toUpperCase(),
        }));
        formData.append("authorityDetails", JSON.stringify(authorityDetails));

        formData.append("totalSchools", values.totalSchools);
        formData.append("totalStudents", values.totalStudents);
        formData.append("totalTeachers", values.totalTeachers);
        formData.append("boardAdminLoginEmail", values.loginEmail);
        formData.append("boardAdminLoginPassword", values.password);

        const spocAuthority = values.authorities.find(
          (auth: any) => auth.role === "SPOC",
        ) || values.authorities[0] || {};
        const spocDetails = {
          name: spocAuthority.name || "",
          email: spocAuthority.email || "",
          phone: spocAuthority.phone || "",
          phoneCode: values.country === "India" ? "+91" : "+1",
        };
        formData.append("spocDetails", JSON.stringify(spocDetails));

        formData.append("boardState", values.state || "");

        const boardName = values.board || "";

        formData.append("boardName", boardName);
        formData.append(
          "boardCode",
          (values.country === "India" ? values.boardCode : "BOARD")
            .toUpperCase()
            .replace(/\s+/g, ""),
        );
        formData.append("boardDescription", "Board Description");

        const uniqueIsdSuffix = Date.now().toString().slice(-6);
        const cleanBoard = (values.board || "BOARD").replace(/\s+/g, "_");
        const isdCode =
          values.country === "India"
            ? `ISD-IN-${cleanBoard}-${uniqueIsdSuffix}`
            : values.isdName;

        formData.append("isdCode", isdCode || `ISD-${uniqueIsdSuffix}`);
        formData.append(
          "isd_State",
          values.state || (values.country === "India" ? "Delhi" : ""),
        );
        formData.append(
          "isd_City",
          values.city || (values.country === "India" ? "New Delhi" : ""),
        );

        const response = await authControllers.selfRegisterBoardAdmin(formData);
        if (response.data?.success) {
          setSnackbar({
            open: true,
            message:
              "Registration requested successfully! Redirecting to verify OTP...",
            severity: "success",
          });
          setTimeout(() => {
            router.push(
              `/verify-otp?email=${encodeURIComponent(values.loginEmail)}`,
            );
          }, 1500);
        } else {
          setSnackbar({
            open: true,
            message: response.data?.message || "Registration failed.",
            severity: "error",
          });
        }
      } catch (error: any) {
        setSnackbar({
          open: true,
          message:
            error.response?.data?.message ||
            "Something went wrong. Please try again.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const isFirstRender = React.useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    formik.setFieldValue("board", "");
    formik.setFieldValue("boardCode", "");
    formik.setFieldValue("state", "");
    formik.setFieldValue("city", "");
    formik.setFieldValue("isdName", "");
    formik.setFieldValue("totalSchools", "");
  }, [formik.values.country]);

  const availableRoles = ["Chairman", "Secretary", "CEO", "SPOC"];

  const handleAddAuthority = () => {
    if (formik.values.authorities.length < 4) {
      formik.setFieldValue("authorities", [
        ...formik.values.authorities,
        { role: "", name: "", email: "", phone: "" },
      ]);
    }
  };

  const handleRemoveAuthority = (index: number) => {
    const newAuthorities = [...formik.values.authorities];
    newAuthorities.splice(index, 1);
    formik.setFieldValue("authorities", newAuthorities);
  };

  const handleNext = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0) {
      if (activeStep < steps.length - 1) {
        setActiveStep((prev) => prev + 1);
      } else {
        formik.handleSubmit();
      }
    } else {
      // Mark all fields as touched to trigger validation messages
      formik.setTouched(
        Object.keys(formik.initialValues).reduce((acc, key) => {
          if (key === "authorities") {
            return {
              ...acc,
              authorities: formik.values.authorities.map(() => ({
                role: true,
                name: true,
                email: true,
                phone: true,
              })),
            };
          }
          return { ...acc, [key]: true };
        }, {}),
      );
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      transition: "all 0.2s ease-in-out",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(18, 35, 51, 0.08)", // Very subtle border
        transition: "all 0.2s",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(18, 35, 51, 0.2)",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: Colors.PRIMARY_BLACK,
        borderWidth: "1.5px",
      },
    },
    "& .MuiInputBase-input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px white inset",
      WebkitTextFillColor: Colors.PRIMARY_BLACK,
      borderRadius: "inherit",
    },
    "& .MuiInputLabel-root": {
      fontSize: "14px",
      color: "rgba(18, 35, 51, 0.5)",
      fontWeight: 500,
      transform: "translate(40px, 16px) scale(1)",
      zIndex: 1,
      pointerEvents: "none",
      transition: "all 0.2s ease-out",
      "&.Mui-focused, &.MuiInputLabel-shrink": {
        transform: "translate(14px, -9px) scale(0.75)", // Perfect top-left snap
        color: Colors.PRIMARY_BLACK,
        fontWeight: 600,
      },
    },
  };

  const getErrorProps = (name: string) => ({
    error:
      formik.touched[name as keyof typeof formik.values] &&
      Boolean(formik.errors[name as keyof typeof formik.values]),
    helperText:
      formik.touched[name as keyof typeof formik.values] &&
      (formik.errors[name as keyof typeof formik.values] as string),
  });

  const renderStepContent = (step: number) => {
    const props = { formik, textFieldSx, getErrorProps };
    switch (step) {
      case 0:
        return <JurisdictionStep {...props} countries={countries} />;
      case 1:
        return (
          <AuthorityStep
            {...props}
            availableRoles={availableRoles}
            handleAddAuthority={handleAddAuthority}
            handleRemoveAuthority={handleRemoveAuthority}
          />
        );
      case 2:
        return <StatisticsStep {...props} />;
      case 3:
        return (
          <AccountStep
            {...props}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Paper
      sx={{
        px: 5,
        pt: 3,
        pb: 3,
        borderRadius: "24px",
        maxWidth: "600px",
        width: "100%",
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.7)",
        boxShadow: "0 10px 36px 0 rgba(31, 38, 135, 0.15)",
      }}
    >
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography
          sx={{
            fontSize: FontSizes.HEADING,
            fontWeight: FontWeights.BOLD,
            color: Colors.PRIMARY_BLACK,
            mb: 1,
          }}
        >
          Create Account
        </Typography>
        <Typography
          sx={{
            fontSize: FontSizes.SMALL,
            color: "rgba(18, 35, 51, 0.5)",
            fontWeight: FontWeights.SEMIBOLD,
          }}
        >
          Register your jurisdiction to start managing schools.
        </Typography>
      </Box>

      <Stepper
        activeStep={activeStep}
        sx={{
          mb: 3,
          "& .MuiStepIcon-root": {
            fontSize: "24px",
            color: "rgba(18, 35, 51, 0.1)",
          },
          "& .MuiStepIcon-root.Mui-active": {
            color: "#122333",
            "& .MuiStepIcon-text": {
              fill: Colors.WHITE,
              fontWeight: FontWeights.SEMIBOLD,
            },
          },
          "& .MuiStepIcon-root.Mui-completed": {
            color: "#00D1C1",
          },
          "& .MuiStepIcon-text": {
            fill: "#122333",
            fontSize: FontSizes.SMALL,
            fontWeight: FontWeights.SEMIBOLD,
          },
          "& .MuiStepLabel-label": {
            fontSize: FontSizes.SMALL,
            fontWeight: FontWeights.SEMIBOLD,
            color: "rgba(18, 35, 51, 0.4)",
          },
          "& .MuiStepLabel-label.Mui-active": {
            color: "#122333",
            fontWeight: FontWeights.SEMIBOLD,
          },
          "& .MuiStepLabel-label.Mui-completed": {
            color: "#00D1C1",
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box
        sx={{
          height: "420px",
          overflowY: "auto",
          width: "100%",
          pt: 2, // Added padding to prevent label cropping
          pr: 1, // Space for scrollbar
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(18, 35, 51, 0.1)",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "rgba(18, 35, 51, 0.2)",
          },
        }}
      >
        {renderStepContent(activeStep)}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 4,
          pt: 2,
          borderTop: "1px solid rgba(18, 35, 51, 0.05)",
        }}
      >
        <Button
          disabled={activeStep === 0 || loading}
          onClick={handleBack}
          sx={{
            color: Colors.PRIMARY_BLACK,
            fontWeight: FontWeights.SEMIBOLD,
            textTransform: "none",
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={loading}
          sx={{
            bgcolor: Colors.PRIMARY_BLACK,
            color: Colors.WHITE,
            borderRadius: "12px",
            px: 4,
            py: 1.5,
            fontWeight: FontWeights.SEMIBOLD,
            textTransform: "none",
            "&:hover": { bgcolor: "#1A2B3B" },
          }}
        >
          {activeStep === steps.length - 1
            ? loading
              ? "Registering..."
              : "Complete Registration"
            : "Continue"}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};
