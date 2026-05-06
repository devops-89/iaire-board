// Centralized Data for IAIRE Dashboards
// Pure TypeScript file - Only strings, numbers and basic objects
export const DashboardData: any = {
  // 1. Student Startup Status Data
  startups: {
    total: 482,
    activeProjects: 310,
    growth: "+12.5%",
    distribution: [
      {
        label: "Number of student startups: Funded",
        value: 35,
        schools: "128",
        color: "#4CAF50",
      },
      {
        label: "Number of student startups: Not Funded",
        value: 65,
        schools: "354",
        color: "#FF9800",
      },
    ],
    detailedMetrics: [
      {
        label: "Number of student startups: Funded",
        value: 35,
        schools: "128",
        color: "#4CAF50",
        iconKey: "startup"
      },
      {
        label: "Number of student startups: Not Funded",
        value: 65,
        schools: "354",
        color: "#FF9800",
        iconKey: "money"
      }
    ]
  },

  // 2. Innovation & Research Status Data
  innovation: {
    totalPatents: 124,
    totalResearch: 456,
    distribution: [
      {
        label: "US Patents: Published",
        value: 20,
        schools: "12",
        color: "#2196F3",
      },
      {
        label: "US Patents: Not Published",
        value: 80,
        schools: "45",
        color: "#1976D2",
      },
      {
        label: "Indian Patents: Published",
        value: 45,
        schools: "28",
        color: "#FF9800",
      },
      {
        label: "Indian Patents: Not Published",
        value: 55,
        schools: "32",
        color: "#F57C00",
      },
      {
        label: "Research Paper: Published",
        value: 75,
        schools: "156",
        color: "#4CAF50",
      },
      {
        label: "Research Paper: Not Published",
        value: 25,
        schools: "54",
        color: "#607D8B",
      },
    ],
    // Detailed Stats for Dashboard Overview
    detailedStats: {
      schools: [
        {
          title: "Schools with Patent Pending",
          value: "540",
          subtext: "In process",
          color: "#7B8D9E",
          iconKey: "pending"
        },
        {
          title: "Schools with Patent Granted",
          value: "363",
          subtext: "Officially granted",
          color: "#00D1C1",
          iconKey: "verified"
        },
        {
          title: "Schools with Research Submitted",
          value: "601",
          subtext: "Review pending",
          color: "#F5A623",
          iconKey: "pending"
        },
        {
          title: "Schools with Research Published",
          value: "523",
          subtext: "In journals",
          color: "#4A90E2",
          iconKey: "success"
        },
      ],
      totals: [
        {
          title: "Total Patents Pending",
          value: "1,940",
          subtext: "Cumulative total",
          color: "#00D1C1",
          iconKey: "pending"
        },
        {
          title: "Total Patents Granted",
          value: "1,274",
          subtext: "Cumulative total",
          color: "#00D1C1",
          iconKey: "verified"
        },
        {
          title: "Total Research Papers Submitted",
          value: "3,120",
          subtext: "Cumulative total",
          color: "#F5A623",
          iconKey: "pending"
        },
        {
          title: "Total Research Papers Published",
          value: "2,710",
          subtext: "Cumulative total",
          color: "#F5A623",
          iconKey: "success"
        },
      ],
    },
    // New Metrics for InnovationResearchLayouts
    metrics: [
      {
        label: "Number of schools with Patent Pending and Granted Status in US",
        value: 85,
        schools: "248",
        color: "#2196F3",
        iconKey: "patent"
      },
      {
        label: "Number of schools with Research Submitted and Published Status in US",
        value: 70,
        schools: "1,205",
        color: "#1976D2",
        iconKey: "research"
      },
      {
        label: "Number of schools with Patent Pending and Granted Status in India",
        value: 65,
        schools: "654",
        color: "#FF9800",
        iconKey: "patent"
      },
      {
        label: "Number of schools with Research Submitted and Published Status in India",
        value: 55,
        schools: "982",
        color: "#F57C00",
        iconKey: "research"
      }
    ]
  },

  // 3. Teacher Certification & Training Data
  teacherTraining: {
    totalTeachers: 1250,
    certified: 850,
    ongoing: 320,
    pending: 80,
    distribution: [
      {
        label: "Schools with 4+ Certified Teachers",
        value: 75,
        schools: "245",
        color: "#4CAF50",
      },
      {
        label: "Schools with 3 Certified Teachers",
        value: 60,
        schools: "180",
        color: "#2196F3",
      },
      {
        label: "Schools with 2 Certified Teachers",
        value: 45,
        schools: "320",
        color: "#9C27B0",
      },
      {
        label: "Schools with 1 Certified Teacher",
        value: 30,
        schools: "410",
        color: "#FF9800",
      },
      {
        label: "Schools with 0 Certified Teachers",
        value: 15,
        schools: "129",
        color: "#F44336",
      },
    ],
    // Detailed Bands for Dashboard Overview
    bands: [
      {
        title: "Schools with ZERO Trained Teachers",
        value: "289",
        subtext: "Needs attention",
        color: "#D0021B",
        iconKey: "pending"
      },
      {
        title: "Schools with ONE Trained Teacher",
        value: "614",
        subtext: "Getting started",
        color: "#F5A623",
        iconKey: "pending"
      },
      {
        title: "Schools with TWO Trained Teachers",
        value: "720",
        subtext: "Progressing",
        color: "#4A90E2",
        iconKey: "success"
      },
      {
        title: "Schools with THREE Trained Teachers",
        value: "648",
        subtext: "Well equipped",
        color: "#00D1C1",
        iconKey: "verified"
      },
      {
        title: "Schools with FOUR+ Trained Teachers",
        value: "576",
        subtext: "Excellent",
        color: "#00D1C1",
        iconKey: "premium"
      },
    ],
    // Training Overview Stats
    overview: {
      miniStats: [
        {
          label: "Trained on Innovation",
          value: "8,420",
          pct: "59% of total",
          iconKey: "innovation",
          color: "#008B81",
        },
        {
          label: "Trained on Research",
          value: "7,640",
          pct: "53% of total",
          iconKey: "research",
          color: "#D97706",
        },
        {
          label: "Trained on Both",
          value: "5,230",
          pct: "36% of total",
          iconKey: "both",
          color: "#4F46E5",
        },
        {
          label: "Total Teachers Trained",
          value: "14,320",
          pct: "Across all schools",
          iconKey: "total",
          color: "#122333",
        },
      ],
      breakdown: [
        { label: "Professional Member", count: 3840, color: "#122333" },
        {
          label: "Certified Innovation Educator",
          count: 3180,
          color: "#008B81",
        },
        { label: "Certified Research Educator", count: 2770, color: "#D97706" },
        {
          label: "Fellow Educator of Innovation",
          count: 1950,
          color: "#4F46E5",
        },
        { label: "Fellow Educator of Research", count: 1490, color: "#BE123C" },
      ],
    },
  },

  // 4. Student Success & Engagement Data
  studentSuccess: {
    topMetrics: [
      {
        label: "Trained on Innovation",
        value: "64,200",
        subtext: "↑ 22% YoY",
        color: "#008B81",
      },
      {
        label: "Trained on Research",
        value: "58,900",
        subtext: "↑ 19% YoY",
        color: "#D97706",
      },
      {
        label: "Trained on Both Innovation + Research",
        value: "44,700",
        subtext: "↑ 31% YoY",
        color: "#4F46E5",
      },
      {
        label: "Student Entrepreneurs",
        value: "842",
        subtext: "Launched startups",
        color: "#BE123C",
      },
      {
        label: "Student Assistant Mentors",
        value: "1,360",
        subtext: "Peer mentors",
        color: "#122333",
      },
    ],
    coverage: [
      { label: "Innovation Training", pct: 59, color: "#008B81" },
      { label: "Research Training", pct: 54, color: "#D97706" },
      { label: "Both Tracks Combined", pct: 41, color: "#4F46E5" },
      { label: "Student Entrepreneurs", pct: 1, color: "#BE123C" },
      { label: "Assistant Mentors", pct: 1.3, color: "#122333" },
    ],
    startupPortfolio: [
      {
        cat: "Funded Startups",
        count: 312,
        share: "37%",
        status: "Active",
        color: "#008B81",
      },
      {
        cat: "Not Funded",
        count: 418,
        share: "50%",
        status: "In Progress",
        color: "#122333",
      },
      {
        cat: "Closed Startups",
        count: 112,
        share: "13%",
        status: "Closed",
        color: "#BE123C",
      },
    ],
    ipSummary: [
      {
        cat: "Patents",
        pending: "1,940",
        granted: "1,274",
        total: "3,214",
        pColor: "#D97706",
        color: "#008B81",
      },
      {
        cat: "Research Papers",
        pending: "3,120",
        granted: "2,710",
        total: "5,830",
        pColor: "#4F46E5",
        color: "#059669",
      },
    ],
  },

  // 5. Membership Summary & Categories
  membership: {
    totalSchools: 540,
    activeMembers: 480,
    expired: 60,
    growth: "+8.2%",
    categories: [
      {
        title: "Fellow Institution Members",
        value: "342",
        subtext: "Highest tier",
        color: "#00D1C1",
        iconKey: "premium"
      },
      {
        title: "Chartered Institution Members",
        value: "518",
        subtext: "Senior tier",
        color: "#122333",
        iconKey: "verified"
      },
      {
        title: "Accredited Institution Members",
        value: "724",
        subtext: "Accredited tier",
        color: "#FF9800",
        iconKey: "success"
      },
      {
        title: "Institution Members",
        value: "831",
        subtext: "Basic tier",
        color: "#BE123C",
        iconKey: "school"
      },
      {
        title: "Not a Member Yet",
        value: "432",
        subtext: "Prospective",
        color: "#7B8D9E",
        iconKey: "pending"
      },
    ],
    detailedMetrics: [
      {
        title: "Total School Members",
        value: "1,248",
        iconKey: "school",
        color: "#122333",
      },
      {
        title: "Not a Member Yet",
        value: "482",
        iconKey: "groups",
        color: "#FF9800",
        hasAction: true,
      },
      {
        title: "Fellow Institution Members",
        value: "310",
        iconKey: "premium",
        color: "#4CAF50",
      },
      {
        title: "Chartered Institution Members",
        value: "185",
        iconKey: "verified",
        color: "#2196F3",
      },
      {
        title: "Accredited Institution Members",
        value: "240",
        iconKey: "premium",
        color: "#9C27B0",
      },
      {
        title: "Standard Institution Members",
        value: "431",
        iconKey: "groups",
        color: "#607D8B",
      },
    ],
  },
};
