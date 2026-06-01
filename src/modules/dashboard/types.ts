export interface DashboardData {
  overview: {
    companies: number;
    sites: number;
    assets: number;
    engineers: number;
  };

  calls: {
    open: number;
    assigned: number;
    inProgress: number;
    closed: number;
  };

  engineerStats: {
    total: number;
    busy: number;
    available: number;
    averageLoad: number;
  };

  engineerWorkload: {
    engineerId: string;
    engineerName: string;
    activeCalls: number;
  }[];

  recentCalls: {
    id: string;
    callNumber: string;
    subject: string;
    status: string;
    engineerName: string | null;
    companyName: string;
    createdAt: Date;
  }[];
}