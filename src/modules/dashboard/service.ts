import { dashboardRepository }
  from "./repository";

export const dashboardService = {
  async getDashboardData(
    tenantId: string
  ) {
    const overview =
      await dashboardRepository.getOverviewCounts(
        tenantId
      );

    return {
      overview,

      calls: {
        open: 0,
        assigned: 0,
        inProgress: 0,
        closed: 0,
      },

      engineerStats: {
        total: 0,
        busy: 0,
        available: 0,
        averageLoad: 0,
      },

      engineerWorkload: [],

      recentCalls: [],
    };
  },
};