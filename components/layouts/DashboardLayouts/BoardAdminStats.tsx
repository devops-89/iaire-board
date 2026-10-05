"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid, Skeleton } from "@mui/material";
import {
  WorkspacePremium as PatentIcon,
  Public as GlobalPatentIcon,
  HourglassEmpty as PendingIndiaIcon,
  Pending as PendingUsaIcon,
  MenuBook as PublishedIcon,
  FactCheck as AcceptedIcon,
  HourglassTop as ResearchPendingIcon,
  Publish as SubmittedIcon,
  School as TeacherSchoolIcon,
  Groups as MemberTeacherIcon,
  Lightbulb as TrainedInnovationIcon,
  Psychology as TrainedResearchIcon,
  RocketLaunch as StartupLaunchedIcon,
  MonetizationOn as StartupFundedIcon,
  AccountBalanceWallet as StartupNonFundedIcon,
  Cancel as StartupClosedIcon,
  TipsAndUpdates as StudentInnovationIcon,
  Biotech as StudentResearchIcon,
  Rocket as StudentStartupIcon,
  SupervisorAccount as StudentMentorIcon,
} from "@mui/icons-material";
import { dashboardControllers } from "@/api/dashboard";
import { Colors } from "@/utils/enum";

export interface DashboardStatItem {
  title: string;
  count: number;
}

export interface BoardAdminDashboardData {
  patents: DashboardStatItem[];
  researchPublications: DashboardStatItem[];
  mentors: DashboardStatItem[];
  startups: DashboardStatItem[];
  students: DashboardStatItem[];
}

export const defaultDashboardData: BoardAdminDashboardData = {
  patents: [
    { title: "Patent granted in India.", count: 2 },
    { title: "Patent granted in USA", count: 0 },
    { title: "Patent pending in India.", count: 0 },
    { title: "Patent Pending in USA.", count: 0 },
  ],
  researchPublications: [
    { title: "Research Published.", count: 2 },
    { title: "Research Accepted.", count: 0 },
    { title: "Research Pending.", count: 5 },
    { title: "Research Submitted.", count: 7 },
  ],
  mentors: [
    { title: "Total number of teachers in schools.", count: 250 },
    { title: "Total number of IAIRE member teachers.", count: 11 },
    { title: "Trained & Certified Teachers in Innovation.", count: 3 },
    { title: "Trained & Certified Teachers in Research.", count: 2 },
  ],
  startups: [
    { title: "Number of Startups Launched", count: 5 },
    { title: "Number of Startups Funded", count: 1 },
    { title: "Number of Startups Non-Funded", count: 0 },
    { title: "Number of Startups Closed", count: 1 },
  ],
  students: [
    { title: "Students Trained on Innovation", count: 2 },
    { title: "Students Trained on Research", count: 1 },
    { title: "Students Who Launched Startups", count: 0 },
    { title: "Students Working as Assistant Mentors", count: 1 },
  ],
};

const formatCardTitle = (raw: string): string => {
  if (!raw) return "";
  const cleaned = raw.trim().replace(/\.+$/, "");
  if (/total number of teachers in schools/i.test(cleaned))
    return "Total Teachers in Schools";
  if (/total number of iaire member teachers/i.test(cleaned))
    return "IAIRE Member Teachers";
  if (/trained & certified teachers in innovation/i.test(cleaned))
    return "Trained in Innovation";
  if (/trained & certified teachers in research/i.test(cleaned))
    return "Trained in Research";
  if (/number of startups launched/i.test(cleaned)) return "Startups Launched";
  if (/number of startups funded/i.test(cleaned)) return "Startups Funded";
  if (/number of startups non-funded/i.test(cleaned))
    return "Startups Non-Funded";
  if (/number of startups closed/i.test(cleaned)) return "Startups Closed";
  if (/students trained on innovation/i.test(cleaned))
    return "Trained on Innovation";
  if (/students trained on research/i.test(cleaned))
    return "Trained on Research";
  if (/students who launched startups/i.test(cleaned))
    return "Launched Startups";
  if (/students working as assistant mentors/i.test(cleaned))
    return "Assistant Mentors";
  return cleaned;
};

const getItemIcon = (title: string, category: string) => {
  const t = title.toLowerCase();

  if (category === "patents") {
    if (t.includes("india") && t.includes("granted"))
      return <PatentIcon sx={{ fontSize: 20 }} />;
    if (t.includes("usa") && t.includes("granted"))
      return <GlobalPatentIcon sx={{ fontSize: 20 }} />;
    if (t.includes("india") && t.includes("pending"))
      return <PendingIndiaIcon sx={{ fontSize: 20 }} />;
    return <PendingUsaIcon sx={{ fontSize: 20 }} />;
  }

  if (category === "research") {
    if (t.includes("published")) return <PublishedIcon sx={{ fontSize: 20 }} />;
    if (t.includes("accepted")) return <AcceptedIcon sx={{ fontSize: 20 }} />;
    if (t.includes("pending"))
      return <ResearchPendingIcon sx={{ fontSize: 20 }} />;
    return <SubmittedIcon sx={{ fontSize: 20 }} />;
  }

  if (category === "mentors") {
    if (t.includes("schools"))
      return <TeacherSchoolIcon sx={{ fontSize: 20 }} />;
    if (t.includes("member"))
      return <MemberTeacherIcon sx={{ fontSize: 20 }} />;
    if (t.includes("innovation"))
      return <TrainedInnovationIcon sx={{ fontSize: 20 }} />;
    return <TrainedResearchIcon sx={{ fontSize: 20 }} />;
  }

  if (category === "startups") {
    if (t.includes("launched"))
      return <StartupLaunchedIcon sx={{ fontSize: 20 }} />;
    if (t.includes("funded") && !t.includes("non"))
      return <StartupFundedIcon sx={{ fontSize: 20 }} />;
    if (t.includes("non-funded"))
      return <StartupNonFundedIcon sx={{ fontSize: 20 }} />;
    return <StartupClosedIcon sx={{ fontSize: 20 }} />;
  }

  if (category === "students") {
    if (t.includes("innovation"))
      return <StudentInnovationIcon sx={{ fontSize: 20 }} />;
    if (t.includes("research"))
      return <StudentResearchIcon sx={{ fontSize: 20 }} />;
    if (t.includes("startups"))
      return <StudentStartupIcon sx={{ fontSize: 20 }} />;
    return <StudentMentorIcon sx={{ fontSize: 20 }} />;
  }

  return <PatentIcon sx={{ fontSize: 20 }} />;
};

interface MetricCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  loading: boolean;
}

const SingleMetricCard: React.FC<MetricCardProps> = ({
  title,
  count,
  icon,
  loading,
}) => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 2.5 },
          borderRadius: "20px",
          bgcolor: "#FFFFFF",
          border: `1px solid ${Colors.BORDER_STONE}`,
          boxShadow: "0 4px 16px rgba(16, 18, 22, 0.04)",
          transition: "all 0.25s ease-in-out",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          minHeight: { xs: "110px", sm: "125px" },
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 28px rgba(16, 18, 22, 0.08)",
            borderColor: Colors.PRIMARY_DARK,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "11px", sm: "12px" },
              fontWeight: 700,
              color: "rgba(16, 18, 22, 0.6)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              maxWidth: "75%",
              lineHeight: 1.3,
            }}
          >
            {formatCardTitle(title)}
          </Typography>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              bgcolor: Colors.ACCENT_MINT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: Colors.PRIMARY_DARK,
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        </Box>

        {loading ? (
          <Skeleton width="40%" height={38} />
        ) : (
          <Typography
            sx={{
              fontSize: { xs: "28px", sm: "32px" },
              fontWeight: 800,
              color: Colors.PRIMARY_DARK,
              lineHeight: 1,
            }}
          >
            {count !== null && count !== undefined ? count : "--"}
          </Typography>
        )}
      </Paper>
    </Grid>
  );
};

interface MetricSectionProps {
  title: string;
  items: DashboardStatItem[];
  categoryKey: string;
  loading: boolean;
}

const MetricSection: React.FC<MetricSectionProps> = ({
  title,
  items,
  categoryKey,
  loading,
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Section Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <Box
          sx={{
            width: 4,
            height: 22,
            bgcolor: Colors.PRIMARY_DARK,
            borderRadius: 2,
          }}
        />
        <Typography
          sx={{
            fontSize: { xs: "17px", sm: "19px" },
            fontWeight: 800,
            color: Colors.PRIMARY_DARK,
            letterSpacing: "-0.3px",
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Row of 4 Cards */}
      <Grid container spacing={3}>
        {items.map((item, idx) => (
          <SingleMetricCard
            key={idx}
            title={item.title}
            count={item.count}
            icon={getItemIcon(item.title, categoryKey)}
            loading={loading}
          />
        ))}
      </Grid>
    </Box>
  );
};

export const BoardAdminStats = () => {
  const [data, setData] =
    useState<BoardAdminDashboardData>(defaultDashboardData);
  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const res = await dashboardControllers.getBoardAdminDashboard();
      if (res?.data && res.data.success && res.data.data) {
        const payload = res.data.data.data || res.data.data;
        setData({
          patents: payload.patents || defaultDashboardData.patents,
          researchPublications:
            payload.researchPublications ||
            defaultDashboardData.researchPublications,
          mentors: payload.mentors || defaultDashboardData.mentors,
          startups: payload.startups || defaultDashboardData.startups,
          students: payload.students || defaultDashboardData.students,
        });
      } else {
        setData(defaultDashboardData);
      }
    } catch (error) {
      console.warn("Using default board admin dashboard stats:", error);
      setData(defaultDashboardData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <Box sx={{ mb: 4 }}>
      {/* 1. Mentors & Faculty */}
      <MetricSection
        title="Mentors & Faculty"
        items={data.mentors}
        categoryKey="mentors"
        loading={loading}
      />

      {/* 2. Student Startups */}
      <MetricSection
        title="Student Startups"
        items={data.startups}
        categoryKey="startups"
        loading={loading}
      />

      {/* 3. Patents & IP Rights */}
      <MetricSection
        title="Patents & IP Rights"
        items={data.patents}
        categoryKey="patents"
        loading={loading}
      />

      {/* 4. Research Publications */}
      <MetricSection
        title="Research Publications"
        items={data.researchPublications}
        categoryKey="research"
        loading={loading}
      />

      {/* 5. Students Development */}
      <MetricSection
        title="Students Development"
        items={data.students}
        categoryKey="students"
        loading={loading}
      />
    </Box>
  );
};
