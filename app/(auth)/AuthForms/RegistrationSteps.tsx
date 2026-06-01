"use client";
import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  Divider,
  FormControl,
  InputLabel,
  Select,
  IconButton,
} from "@mui/material";
import { Colors } from "@/utils/enum";
import {
  Business as SchoolIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Public as WorldIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

export const JurisdictionStep = ({
  formik,
  textFieldSx,
  getErrorProps,
  countries = [],
}: any) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}
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
          {countries.map((c: any) => (
            <MenuItem key={c.code || c.id} value={c.name}>
              {c.name}
            </MenuItem>
          ))}
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
            {formik.errors.country as string}
          </Typography>
        )}
      </FormControl>

      {formik.values.country === "India" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
          <TextField
            fullWidth
            label="Board Selection"
            name="board"
            value={formik.values.board}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            {...getErrorProps("board")}
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
        </Box>
      )}

      {(formik.values.country === "US" ||
        formik.values.country === "United States") && (
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
            label="ISD"
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
};

export const AuthorityStep = ({
  formik,
  textFieldSx,
  getErrorProps,
  availableRoles,
  handleAddAuthority,
  handleRemoveAuthority,
}: any) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
    {formik.values.authorities.map((auth: any, index: number) => {
      const currentRoles = formik.values.authorities
        .map((a: any, i: number) => (i !== index ? a.role : null))
        .filter(Boolean);
      const filteredRoles = availableRoles.filter(
        (r: string) => !currentRoles.includes(r),
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
              {filteredRoles.map((role: string) => (
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
                Boolean((formik.errors.authorities as any)?.[index]?.email)
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
                Boolean((formik.errors.authorities as any)?.[index]?.phone)
              }
              helperText={
                formik.touched.authorities?.[index]?.phone &&
                (formik.errors.authorities as any)?.[index]?.phone
              }
              sx={textFieldSx}
              slotProps={{
                input: { sx: { bgcolor: Colors.WHITE, borderRadius: "12px" } },
              }}
            />
          </Box>
        </Box>
      );
    })}

    {formik.values.authorities.length < 4 && (
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

export const StatisticsStep = ({ formik, textFieldSx, getErrorProps }: any) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
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
                sx={{ color: "rgba(18, 35, 51, 0.3)", fontSize: 20, ml: 1 }}
              />
            </InputAdornment>
          ),
          sx: { bgcolor: Colors.REGISTRATION_FORM_BG, borderRadius: "12px" },
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
            sx: { bgcolor: Colors.REGISTRATION_FORM_BG, borderRadius: "12px" },
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
            sx: { bgcolor: Colors.REGISTRATION_FORM_BG, borderRadius: "12px" },
          },
        }}
      />
    </Box>
  </Box>
);

export const AccountStep = ({
  formik,
  textFieldSx,
  getErrorProps,
  showPassword,
  setShowPassword,
}: any) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
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
                sx={{ color: "rgba(18, 35, 51, 0.3)", fontSize: 20, ml: 1 }}
              />
            </InputAdornment>
          ),
          sx: { bgcolor: Colors.WHITE, borderRadius: "12px" },
        },
      }}
    />
    <TextField
      fullWidth
      type={showPassword ? "text" : "password"}
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
                sx={{ color: "rgba(18, 35, 51, 0.3)", fontSize: 20, ml: 1 }}
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                sx={{ color: "rgba(18, 35, 51, 0.3)", mr: 1 }}
              >
                {showPassword ? (
                  <VisibilityOff sx={{ fontSize: 20 }} />
                ) : (
                  <Visibility sx={{ fontSize: 20 }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
          sx: { bgcolor: Colors.WHITE, borderRadius: "12px" },
        },
      }}
    />
  </Box>
);
