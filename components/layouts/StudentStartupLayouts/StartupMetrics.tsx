"use client";
import React from "react";
import Grid from "@mui/material/Grid";
import {
  RocketLaunch as StartupIcon,
  MonetizationOn as MoneyIcon,
} from "@mui/icons-material";
import { IndividualDistributionCard } from "@/components/layouts/TeacherCertificationLayouts/IndividualDistributionCard";

// Icon mapping for Startup Metrics
const IconMap: any = {
  startup: StartupIcon,
  money: MoneyIcon,
};

interface StartupMetricsProps {
  fundedCount: number;
  notFundedCount: number;
  total: number;
  loading: boolean;
}

export const StartupMetrics: React.FC<StartupMetricsProps> = ({
  fundedCount,
  notFundedCount,
  total,
  loading,
}) => {
  const fundedPercent = total > 0 ? Math.round((fundedCount / total) * 100) : 0;
  const notFundedPercent = total > 0 ? 100 - fundedPercent : 0;

  const metrics = [
    {
      label: "Number of student startups: Funded",
      value: fundedPercent,
      schools: loading ? "..." : String(fundedCount),
      color: "#4CAF50",
      iconKey: "startup",
    },
    {
      label: "Number of student startups: Not Funded",
      value: notFundedPercent,
      schools: loading ? "..." : String(notFundedCount),
      color: "#FF9800",
      iconKey: "money",
    },
  ];

  return (
    <>
      {metrics.map((item: any, index: number) => {
        const IconComponent = IconMap[item.iconKey] || StartupIcon;

        return (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
            <IndividualDistributionCard
              label={item.label}
              value={item.value}
              schools={item.schools}
              color={item.color}
              icon={<IconComponent sx={{ fontSize: 22 }} />}
            />
          </Grid>
        );
      })}
    </>
  );
};
