import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Activity, Users, TrendingUp } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  progress?: number;
  trend?: string;
}

const AnalyticsCard = ({
  title = "Metric",
  value = "0",
  icon = <Activity className="h-4 w-4" />,
  progress = 0,
  trend = "+0%",
}: AnalyticsCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <Progress value={progress} className="h-2 mt-4" />
        <p className="text-xs text-muted-foreground mt-2">
          {trend} from last month
        </p>
      </CardContent>
    </Card>
  );
};

interface AnalyticsGridProps {
  metrics?: {
    livestock: { value: string; progress: number; trend: string };
    productivity: { value: string; progress: number; trend: string };
    alerts: { value: string; progress: number; trend: string };
    performance: { value: string; progress: number; trend: string };
  };
}

const AnalyticsGrid = ({
  metrics = {
    livestock: { value: "2,345", progress: 75, trend: "+12%" },
    productivity: { value: "87%", progress: 65, trend: "+5%" },
    alerts: { value: "3", progress: 30, trend: "-2%" },
    performance: { value: "92%", progress: 85, trend: "+8%" },
  },
}: AnalyticsGridProps) => {
  return (
    <div className="bg-gray-50 p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard
          title="Livestock Health"
          value={metrics.livestock.value}
          icon={<Activity className="h-4 w-4 text-blue-600" />}
          progress={metrics.livestock.progress}
          trend={metrics.livestock.trend}
        />
        <AnalyticsCard
          title="Worker Productivity"
          value={metrics.productivity.value}
          icon={<Users className="h-4 w-4 text-green-600" />}
          progress={metrics.productivity.progress}
          trend={metrics.productivity.trend}
        />
        <AnalyticsCard
          title="Active Alerts"
          value={metrics.alerts.value}
          icon={<AlertCircle className="h-4 w-4 text-red-600" />}
          progress={metrics.alerts.progress}
          trend={metrics.alerts.trend}
        />
        <AnalyticsCard
          title="Overall Performance"
          value={metrics.performance.value}
          icon={<TrendingUp className="h-4 w-4 text-purple-600" />}
          progress={metrics.performance.progress}
          trend={metrics.performance.trend}
        />
      </div>
    </div>
  );
};

export default AnalyticsGrid;
