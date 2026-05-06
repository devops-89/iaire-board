import { ReactNode } from "react";

// --- Authentication & Account ---
export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignupFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordFormValues {
  email: string;
}

export interface VerifyOtpFormValues {
  otp: string;
}

export interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  avatar?: string;
  role: string;
  lastLogin?: string;
}

// --- Dashboard & Analytical Components ---
export interface IndividualDistributionCardProps {
  label: string;
  value: number;
  schools: string | number;
  color: string;
  icon?: ReactNode;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
  trend?: string;
  isPositive?: boolean;
}

export interface DetailCardProps {
  title: string;
  value: string | number;
  subtext: string;
  icon?: ReactNode;
  color: string;
}

// --- Sidebar & Navigation ---
export interface MenuItem {
  text: string;
  icon: ReactNode;
  path: string;
}

export interface MenuGroup {
  title: string;
  items: MenuItem[];
}

// --- Shared Data Models & Structures ---
export interface DistributionItem {
  label: string;
  value: number;
  schools: string | number;
  color: string;
  icon?: ReactNode;
}

export interface DashboardStats {
  total: number;
  activeProjects?: number;
  growth?: string;
  distribution: DistributionItem[];
}

// --- Filter & Search State ---
export interface FilterState {
  searchQuery: string;
  tabValue: number;
  sortBy?: string;
}
