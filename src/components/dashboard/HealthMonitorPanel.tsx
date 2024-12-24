import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight, Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HealthAlert {
  id: string;
  title: string;
  severity: number;
  timestamp: string;
  recommendation: string;
  status: "critical" | "warning" | "normal";
}

interface HealthMonitorPanelProps {
  alerts?: HealthAlert[];
}

const defaultAlerts: HealthAlert[] = [
  {
    id: "1",
    title: "High fever detected in Barn A",
    severity: 85,
    timestamp: "2024-01-20T10:30:00Z",
    recommendation: "Isolate affected livestock and contact veterinarian",
    status: "critical",
  },
  {
    id: "2",
    title: "Unusual behavior in Pen B3",
    severity: 65,
    timestamp: "2024-01-20T09:15:00Z",
    recommendation: "Monitor closely for next 24 hours",
    status: "warning",
  },
  {
    id: "3",
    title: "Regular health check due",
    severity: 30,
    timestamp: "2024-01-20T08:00:00Z",
    recommendation: "Schedule routine checkup",
    status: "normal",
  },
];

const HealthMonitorPanel = ({
  alerts = defaultAlerts,
}: HealthMonitorPanelProps) => {
  const getSeverityColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  return (
    <Card className="p-4 bg-white border rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold">Health Monitoring</h2>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {alerts.length} Active Alerts
        </Badge>
      </div>

      <ScrollArea className="h-[150px] w-full rounded-md border p-4">
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border ${getSeverityColor(alert.status)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{alert.title}</h3>
                <Badge variant="outline">
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </Badge>
              </div>

              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Severity</span>
                  <span>{alert.severity}%</span>
                </div>
                <Progress value={alert.severity} className="h-2" />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">{alert.recommendation}</p>
                <Button variant="ghost" size="sm" className="ml-2">
                  Take Action
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default HealthMonitorPanel;
