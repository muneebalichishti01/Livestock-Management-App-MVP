import React from "react";
import AnalyticsGrid from "./dashboard/AnalyticsGrid";
import TaskManagementBoard from "./dashboard/TaskManagementBoard";
import HealthMonitorPanel from "./dashboard/HealthMonitorPanel";
import ActionFAB from "./dashboard/ActionFAB";
import BottomNav from "./dashboard/BottomNav";

interface HomeProps {
  activeTab?: "dashboard" | "reports" | "workers" | "settings";
  analyticsData?: {
    livestock: { value: string; progress: number; trend: string };
    productivity: { value: string; progress: number; trend: string };
    alerts: { value: string; progress: number; trend: string };
    performance: { value: string; progress: number; trend: string };
  };
  tasks?: Array<{
    id: string;
    title: string;
    description: string;
    status: "todo" | "in-progress" | "done";
    assignee?: {
      name: string;
      avatar: string;
    };
    aiSuggestion?: string;
    dueDate: string;
  }>;
  healthAlerts?: Array<{
    id: string;
    title: string;
    severity: number;
    timestamp: string;
    recommendation: string;
    status: "critical" | "warning" | "normal";
  }>;
}

const Home = ({
  activeTab = "dashboard",
  analyticsData,
  tasks,
  healthAlerts,
}: HomeProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="pb-20">
        {/* Analytics Section */}
        <section className="mb-6">
          <AnalyticsGrid metrics={analyticsData} />
        </section>

        {/* Task Management Section */}
        <section className="mb-6 px-4">
          <TaskManagementBoard tasks={tasks} />
        </section>

        {/* Health Monitoring Section */}
        <section className="px-4 mb-6">
          <HealthMonitorPanel alerts={healthAlerts} />
        </section>

        {/* Floating Action Button */}
        <ActionFAB />
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} />
    </div>
  );
};

export default Home;
