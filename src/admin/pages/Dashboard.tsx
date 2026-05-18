import { Users, ShoppingCart, DollarSign, Activity, Clock } from 'lucide-react';
import { StatsCard } from '../components/features/StatsCard';
import { ChartCard } from '../components/charts/ChartCard';
import { LineChart } from '../components/charts/LineChart';
import { BarChart } from '../components/charts/BarChart';
import { PieChart } from '../components/charts/PieChart';
import { AreaChart } from '../components/charts/AreaChart';
import { ActivityItem } from '../components/features/ActivityItem';
import { NotificationItem } from '../components/features/NotificationItem';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import {
  dashboardStats,
  monthlyGrowthData,
  weeklyActivityData,
  categoryDistributionData,
  revenueTrendData,
  mockActivities,
  mockNotifications,
} from '../data/mockData';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="Total Users"
          value={dashboardStats.totalUsers}
          change={dashboardStats.usersChange}
          icon={Users}
          color="primary"
        />
        <StatsCard
          title="Total Orders"
          value={dashboardStats.totalOrders}
          change={dashboardStats.ordersChange}
          icon={ShoppingCart}
          color="success"
        />
        <StatsCard
          title="Revenue"
          value={`$${dashboardStats.revenue.toLocaleString()}`}
          change={dashboardStats.revenueChange}
          icon={DollarSign}
          color="warning"
        />
        <StatsCard
          title="Active Sessions"
          value={dashboardStats.activeSessions}
          change={dashboardStats.sessionsChange}
          icon={Activity}
          color="info"
        />
        <StatsCard
          title="Pending Approvals"
          value={dashboardStats.pendingApprovals}
          change={dashboardStats.approvalsChange}
          icon={Clock}
          color="error"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Monthly Growth" subtitle="User registration trend">
          <LineChart
            labels={monthlyGrowthData.labels}
            data={monthlyGrowthData.values}
            label="Users"
            color="#6366F1"
          />
        </ChartCard>

        <ChartCard title="Weekly Activity" subtitle="Orders and user activity">
          <BarChart
            labels={weeklyActivityData.labels}
            datasets={[
              { label: 'Orders', data: weeklyActivityData.datasets[0].values, color: '#6366F1' },
              { label: 'Users', data: weeklyActivityData.datasets[1].values, color: '#10B981' },
            ]}
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Category Distribution" subtitle="Service breakdown">
          <PieChart
            labels={categoryDistributionData.labels}
            data={categoryDistributionData.values}
          />
        </ChartCard>

        <ChartCard title="Revenue Trends" subtitle="Monthly revenue streams">
          <AreaChart
            labels={revenueTrendData.labels}
            datasets={[
              { label: 'Subscriptions', data: revenueTrendData.datasets[0].values, color: '#6366F1' },
              { label: 'One-time', data: revenueTrendData.datasets[1].values, color: '#10B981' },
            ]}
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Recent Activity
            </h3>
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All
            </Button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {mockActivities.slice(0, 5).map((activity) => (
              <ActivityItem
                key={activity.id}
                type={activity.type}
                message={activity.message}
                user={activity.user}
                timestamp={activity.timestamp}
              />
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Notifications
            </h3>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {mockNotifications.filter(n => !n.read).length} unread
            </span>
          </div>
          <div className="space-y-3">
            {mockNotifications.slice(0, 4).map((notification) => (
              <NotificationItem
                key={notification.id}
                type={notification.type}
                title={notification.title}
                message={notification.message}
                timestamp={notification.timestamp}
                read={notification.read}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}