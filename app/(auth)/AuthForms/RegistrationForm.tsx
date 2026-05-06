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
} from "@mui/material";
import { FontSizes, FontWeights, LineHeights } from "@/utils/style";
import { Colors } from "@/utils/enum";
import {
  Business as SchoolIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Public as WorldIcon,
  Groups as GroupIcon,
} from "@mui/icons-material";
import { Poppins } from "@/utils/font";

import { useFormik } from "formik";
import * as Yup from "yup";

const steps = ["Jurisdiction", "Authority", "Statistics", "Account"];

const validationSchemas = [
  // Step 0: Jurisdiction
  Yup.object({
    country: Yup.string().required("Country is required"),
    board: Yup.string().when("country", {
      is: "India",
      then: (schema) => schema.required("Board selection is required"),
      otherwise: (schema) => schema.optional(),
    }),
    state: Yup.string().when(["country", "board"], {
      is: (country: string, board: string) =>
        country === "US" || (country === "India" && board === "State Board"),
      then: (schema) => schema.required("State is required"),
      otherwise: (schema) => schema.optional(),
    }),
    city: Yup.string().when("country", {
      is: "US",
      then: (schema) => schema.required("City is required"),
      otherwise: (schema) => schema.optional(),
    }),
    isdName: Yup.string().when("country", {
      is: "US",
      then: (schema) => schema.required("ISD Name is required"),
      otherwise: (schema) => schema.optional(),
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
    spocName: Yup.string().required("Full name is required"),
    spocEmail: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    spocPhone: Yup.string().required("Phone number is required"),
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

  const formik = useFormik({
    initialValues: {
      country: "",
      board: "",
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
    onSubmit: (values) => {
      console.log("Final Registration Data:", values);
    },
  });

  const availableRoles = ["Chairman", "Secretary", "CEO"];

  const handleAddAuthority = () => {
    if (formik.values.authorities.length < 3) {
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
    switch (step) {
      case 0:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "100%",
            }}
          >
            <FormControl
              fullWidth
              sx={textFieldSx}
              error={formik.touched.country && Boolean(formik.errors.country)}
            >
              <InputLabel id="country-label">Select Country</InputLabel>
              <Select
                labelId="country-label"
                id="country"
                name="country"
                label="Select Country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                startAdornment={
                  <InputAdornment position="start" sx={{ ml: 1 }}>
                    <WorldIcon
                      sx={{ color: "rgba(18, 35, 51, 0.3)", fontSize: 20 }}
                    />
                  </InputAdornment>
                }
                sx={{
                  bgcolor: Colors.REGISTRATION_FORM_BG,
                  borderRadius: "12px",
                  height: "56px",
                  "& .MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                    pl: 0.5,
                  },
                }}
              >
                <MenuItem value="India">India</MenuItem>
                <MenuItem value="US">United States</MenuItem>
              </Select>
              {formik.touched.country && formik.errors.country && (
                <Typography
                  sx={{
                    color: "#d32f2f",
                    fontSize: "12px",
                    fontWeight: 500,
                    mt: 0.5,
                  }}
                >
                  {formik.errors.country}
                </Typography>
              )}
            </FormControl>

            {formik.values.country === "India" && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <FormControl
                  fullWidth
                  sx={textFieldSx}
                  error={formik.touched.board && Boolean(formik.errors.board)}
                >
                  <InputLabel id="board-label">Board Selection</InputLabel>
                  <Select
                    labelId="board-label"
                    id="board"
                    name="board"
                    label="Board Selection"
                    value={formik.values.board}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{
                      bgcolor: Colors.REGISTRATION_FORM_BG,
                      borderRadius: "12px",
                      height: "56px",
                    }}
                  >
                    <MenuItem value="CBSE">CBSE</MenuItem>
                    <MenuItem value="ICSE">ICSE</MenuItem>
                    <MenuItem value="State Board">State Board</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  {formik.touched.board && formik.errors.board && (
                    <Typography
                      sx={{
                        color: "#d32f2f",
                        fontSize: "12px",
                        fontWeight: 500,
                        mt: 0.5,
                      }}
                    >
                      {formik.errors.board}
                    </Typography>
                  )}
                </FormControl>
                {formik.values.board === "Other" && (
                  <TextField
                    fullWidth
                    label="Specify Board Name"
                    name="otherBoard"
                    value={formik.values.otherBoard}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    {...getErrorProps("otherBoard")}
                    sx={textFieldSx}
                    slotProps={{
                      input: {
                        sx: {
                          bgcolor: Colors.REGISTRATION_FORM_BG,
                          borderRadius: "12px",
                        },
                      },
                    }}
                  />
                )}
                {formik.values.board === "State Board" && (
                  <TextField
                    fullWidth
                    label="Select State"
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    {...getErrorProps("state")}
                    sx={textFieldSx}
                    slotProps={{
                      input: {
                        sx: {
                          bgcolor: Colors.REGISTRATION_FORM_BG,
                          borderRadius: "12px",
                        },
                      },
                    }}
                  />
                )}
              </Box>
            )}

            {formik.values.country === "US" && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    {...getErrorProps("state")}
                    sx={textFieldSx}
                    slotProps={{
                      input: {
                        sx: {
                          bgcolor: Colors.REGISTRATION_FORM_BG,
                          borderRadius: "12px",
                        },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    {...getErrorProps("city")}
                    sx={textFieldSx}
                    slotProps={{
                      input: {
                        sx: {
                          bgcolor: Colors.REGISTRATION_FORM_BG,
                          borderRadius: "12px",
                        },
                      },
                    }}
                  />
                </Box>
                <TextField
                  fullWidth
                  label="ISD Name"
                  name="isdName"
                  value={formik.values.isdName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  {...getErrorProps("isdName")}
                  sx={textFieldSx}
                  slotProps={{
                    input: {
                      sx: {
                        bgcolor: Colors.REGISTRATION_FORM_BG,
                        borderRadius: "12px",
                      },
                    },
                  }}
                />
              </Box>
            )}
          </Box>
        );
      case 1:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              width: "100%",
            }}
          >
            {formik.values.authorities.map((auth, index) => {
              const currentRoles = formik.values.authorities
                .map((a, i) => (i !== index ? a.role : null))
                .filter(Boolean);
              const filteredRoles = availableRoles.filter(
                (r) => !currentRoles.includes(r),
              );

              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    p: 3,
                    borderRadius: "20px",
                    bgcolor: "rgba(18, 35, 51, 0.03)",
                    border: "1px solid rgba(18, 35, 51, 0.05)",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "14px",
                        color: Colors.PRIMARY_BLACK,
                      }}
                    >
                      {auth.role || "Select Authority"} Details
                    </Typography>
                    {index > 0 && (
                      <Button
                        size="small"
                        onClick={() => handleRemoveAuthority(index)}
                        sx={{
                          color: "#d32f2f",
                          textTransform: "none",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </Box>

                  <FormControl
                    fullWidth
                    sx={textFieldSx}
                    error={
                      formik.touched.authorities?.[index]?.role &&
                      Boolean((formik.errors.authorities as any)?.[index]?.role)
                    }
                  >
                    <InputLabel>Select Role</InputLabel>
                    <Select
                      name={`authorities[${index}].role`}
                      value={auth.role}
                      label="Select Role"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      sx={{ bgcolor: Colors.WHITE, borderRadius: "12px" }}
                    >
                      {filteredRoles.map((role) => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Full Name"
                    name={`authorities[${index}].name`}
                    value={auth.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.authorities?.[index]?.name &&
                      Boolean((formik.errors.authorities as any)?.[index]?.name)
                    }
                    helperText={
                      formik.touched.authorities?.[index]?.name &&
                      (formik.errors.authorities as any)?.[index]?.name
                    }
                    sx={textFieldSx}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon
                              sx={{
                                color: "rgba(18, 35, 51, 0.3)",
                                fontSize: 20,
                                ml: 1,
                              }}
                            />
                          </InputAdornment>
                        ),
                        sx: { bgcolor: Colors.WHITE, borderRadius: "12px" },
                      },
                    }}
                  />

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      fullWidth
                      label="Email Id"
                      name={`authorities[${index}].email`}
                      value={auth.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.authorities?.[index]?.email &&
                        Boolean(
                          (formik.errors.authorities as any)?.[index]?.email,
                        )
                      }
                      helperText={
                        formik.touched.authorities?.[index]?.email &&
                        (formik.errors.authorities as any)?.[index]?.email
                      }
                      sx={textFieldSx}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon
                                sx={{
                                  color: "rgba(18, 35, 51, 0.3)",
                                  fontSize: 20,
                                  ml: 1,
                                }}
                              />
                            </InputAdornment>
                          ),
                          sx: { bgcolor: Colors.WHITE, borderRadius: "12px" },
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name={`authorities[${index}].phone`}
                      value={auth.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.authorities?.[index]?.phone &&
                        Boolean(
                          (formik.errors.authorities as any)?.[index]?.phone,
                        )
                      }
                      helperText={
                        formik.touched.authorities?.[index]?.phone &&
                        (formik.errors.authorities as any)?.[index]?.phone
                      }
                      sx={textFieldSx}
                      slotProps={{
                        input: {
                          sx: { bgcolor: Colors.WHITE, borderRadius: "12px" },
                        },
                      }}
                    />
                  </Box>
                </Box>
              );
            })}

            {formik.values.authorities.length < 3 && (
              <Button
                variant="outlined"
                onClick={handleAddAuthority}
                sx={{
                  py: 1.5,
                  borderRadius: "12px",
                  borderColor: "rgba(18, 35, 51, 0.2)",
                  color: Colors.PRIMARY_BLACK,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "14px",
                  "&:hover": {
                    borderColor: Colors.PRIMARY_BLACK,
                    bgcolor: "rgba(18, 35, 51, 0.02)",
                  },
                }}
              >
                + Add Another Authority
              </Button>
            )}
          </Box>
        );
      case 2:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "100%",
            }}
          >
            <TextField
              fullWidth
              type="number"
              label="Total Schools"
              name="totalSchools"
              value={formik.values.totalSchools}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              {...getErrorProps("totalSchools")}
              sx={textFieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon
                        sx={{
                          color: "rgba(18, 35, 51, 0.3)",
                          fontSize: 20,
                          ml: 1,
                        }}
                      />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: Colors.REGISTRATION_FORM_BG,
                    borderRadius: "12px",
                  },
                },
              }}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                type="number"
                label="Total Students"
                name="totalStudents"
                value={formik.values.totalStudents}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                {...getErrorProps("totalStudents")}
                sx={textFieldSx}
                slotProps={{
                  input: {
                    sx: {
                      bgcolor: Colors.REGISTRATION_FORM_BG,
                      borderRadius: "12px",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                type="number"
                label="Total Teachers"
                name="totalTeachers"
                value={formik.values.totalTeachers}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                {...getErrorProps("totalTeachers")}
                sx={textFieldSx}
                slotProps={{
                  input: {
                    sx: {
                      bgcolor: Colors.REGISTRATION_FORM_BG,
                      borderRadius: "12px",
                    },
                  },
                }}
              />
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <TextField
              fullWidth
              label="Login Email Id"
              name="loginEmail"
              autoComplete="off"
              value={formik.values.loginEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              {...getErrorProps("loginEmail")}
              sx={textFieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon
                        sx={{
                          color: "rgba(18, 35, 51, 0.3)",
                          fontSize: 20,
                          ml: 1,
                        }}
                      />
                    </InputAdornment>
                  ),
                  sx: { bgcolor: Colors.WHITE, borderRadius: "12px" },
                },
              }}
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              name="password"
              autoComplete="new-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              {...getErrorProps("password")}
              sx={textFieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon
                        sx={{
                          color: "rgba(18, 35, 51, 0.3)",
                          fontSize: 20,
                          ml: 1,
                        }}
                      />
                    </InputAdornment>
                  ),
                  sx: { bgcolor: Colors.WHITE, borderRadius: "12px" },
                },
              }}
            />

            <Divider sx={{ my: 0.5, borderColor: "rgba(0,0,0,0.05)" }} />

            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "14px",
                color: "rgba(0,0,0,0.6)",
                mb: 0.5,
              }}
            >
              Single point of Contact person
            </Typography>
            <TextField
              fullWidth
              label="Full Name"
              name="spocName"
              value={formik.values.spocName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              {...getErrorProps("spocName")}
              sx={textFieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon
                        sx={{
                          color: "rgba(18, 35, 51, 0.3)",
                          fontSize: 20,
                          ml: 1,
                        }}
                      />
                    </InputAdornment>
                  ),
                  sx: { bgcolor: Colors.WHITE, borderRadius: "12px" },
                },
              }}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                label="Email Id"
                name="spocEmail"
                value={formik.values.spocEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                {...getErrorProps("spocEmail")}
                sx={textFieldSx}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon
                          sx={{
                            color: "rgba(18, 35, 51, 0.3)",
                            fontSize: 20,
                            ml: 1,
                          }}
                        />
                      </InputAdornment>
                    ),
                    sx: { bgcolor: Colors.WHITE, borderRadius: "12px" },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="spocPhone"
                value={formik.values.spocPhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                {...getErrorProps("spocPhone")}
                sx={textFieldSx}
                slotProps={{
                  input: {
                    sx: { bgcolor: Colors.WHITE, borderRadius: "12px" },
                  },
                }}
              />
            </Box>
          </Box>
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
          disabled={activeStep === 0}
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
            ? "Complete Registration"
            : "Continue"}
        </Button>
      </Box>
    </Paper>
  );
};
