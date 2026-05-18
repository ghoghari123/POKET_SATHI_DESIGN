import { useState } from 'react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { FilterDropdown } from '../components/features/FilterDropdown';
import { StatsCard } from '../components/features/StatsCard';
import { ChartCard } from '../components/charts/ChartCard';
import { LineChart } from '../components/charts/LineChart';
import { BarChart } from '../components/charts/BarChart';
import { AreaChart } from '../components/charts/AreaChart';
import { analyticsData } from '../data/mockData';
import { formatCurrency } from '../utils/helpers';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Percent, Calculator } from 'lucide-react';

const dateRangeOptions = [
  { value: 'today', label: 'Today' },
  { value: '7days', label: 'Last 7 Days' },
  { value: '30days', label: 'Last 30 Days' },
  { value: '90days', label: 'Last 90 Days' },
  { value: 'custom', label: 'Custom Range' },
];

export function Analytics() {
  const [dateRange, setDateRange] = useState('30days');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Analytics Overview</h2>
        <div className="flex gap-4">
          <FilterDropdown
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
            placeholder="Select date range"
          />
          <Button variant="outline">Generate Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(analyticsData.totalRevenue)}
          change={15.3}
          icon={DollarSign}
          color="success"
        />
        <StatsCard
          title="Total Orders"
          value={analyticsData.totalOrders}
          change={8.2}
          icon={ShoppingCart}
          color="primary"
        />
        <StatsCard
          title="Conversion Rate"
          value={`${analyticsData.conversionRate}%`}
          change={2.1}
          icon={Percent}
          color="warning"
        />
        <StatsCard
          title="Avg Order Value"
          value={formatCurrency(analyticsData.avgOrderValue)}
          change={-1.2}
          icon={Calculator}
          color="info"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Revenue Over Time" subtitle="Monthly revenue trend">
          <LineChart
            labels={analyticsData.revenueByMonth.map((d) => d.month)}
            data={analyticsData.revenueByMonth.map((d) => d.revenue)}
            label="Revenue"
            color="#10B981"
          />
        </ChartCard>

        <ChartCard title="User Acquisition" subtitle="New users per month">
          <BarChart
            labels={analyticsData.userAcquisition.map((d) => d.month)}
            datasets={[
              { label: 'New Users', data: analyticsData.userAcquisition.map((d) => d.users), color: '#6366F1' },
            ]}
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {analyticsData.topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-indigo-500" />
                  <span className="text-slate-600 dark:text-slate-300">{category.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {formatCurrency(category.revenue)}
                  </span>
                  <Badge variant="default">{category.percentage}%</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <ChartCard title="Revenue Sources" subtitle="Subscription vs One-time">
          <AreaChart
            labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
            datasets={[
              { label: 'Subscriptions', data: [12000, 14500, 16000, 18000, 19500, 22000], color: '#6366F1' },
              { label: 'One-time', data: [3000, 4500, 3800, 5200, 4800, 5500], color: '#10B981' },
            ]}
          />
        </ChartCard>
      </div>
    </div>
  );
}