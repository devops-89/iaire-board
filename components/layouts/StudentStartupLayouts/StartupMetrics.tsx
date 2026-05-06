"use client";
import React from "react";
import Grid from "@mui/material/Grid";
import {
  RocketLaunch as StartupIcon,
  MonetizationOn as MoneyIcon,
} from "@mui/icons-material";
import { IndividualDistributionCard } from "@/components/layouts/TeacherCertificationLayouts/IndividualDistributionCard";
import { DashboardData } from "@/assets/generic-data";

// Icon mapping for Startup Metrics
const IconMap: any = {
  startup: StartupIcon,
  money: MoneyIcon,
};

export const StartupMetrics = () => {
  const metrics = DashboardData.startups?.detailedMetrics || [];

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
