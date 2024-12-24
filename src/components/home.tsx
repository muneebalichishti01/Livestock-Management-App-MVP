import { useState } from "react";
import AnalyticsGrid from "./dashboard/AnalyticsGrid";
import TaskManagementBoard from "./dashboard/TaskManagementBoard";
import WorkersPage from "./workers/WorkersPage";
import HealthMonitorPanel from "./dashboard/HealthMonitorPanel";
import ActionFAB from "./dashboard/ActionFAB";
import BottomNav from "./dashboard/BottomNav";
import Header from "./dashboard/Header";
import ReportsPage from "./reports/ReportsPage";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Users,
  Settings,
  LayoutDashboard,
  ChevronRight,
  Activity,
  ListTodo,
  HeartPulse,
} from "lucide-react";

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "reports" | "workers" | "settings"
  >("dashboard");
  const [activeDashboardView, setActiveDashboardView] = useState<
    "analytics" | "tasks" | "health"
  >("analytics");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "workers", label: "Workers", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const dashboardViews = [
    { id: "analytics", label: "Analytics", icon: Activity },
    { id: "tasks", label: "Tasks", icon: ListTodo },
    { id: "health", label: "Health", icon: HeartPulse },
  ];

  const renderDashboardContent = () => {
    switch (activeDashboardView) {
      case "analytics":
        return <AnalyticsGrid />;
      case "tasks":
        return <TaskManagementBoard />;
      case "health":
        return <HealthMonitorPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-50">
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle>Agrevanna</SheetTitle>
          </SheetHeader>
          <nav className="p-4">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      setActiveTab(item.id as typeof activeTab);
                      setSidebarOpen(false);
                    }}
                  >
                    <Icon className="mr-2 h-5 w-5" />
                    {item.label}
                    <ChevronRight className="ml-auto h-5 w-5" />
                  </Button>
                );
              })}
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      <main className="flex-1 overflow-y-auto pb-20 pt-4 px-2 sm:px-4">
        <div className="container mx-auto max-w-7xl space-y-4">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <Tabs
                value={activeDashboardView}
                onValueChange={(v) =>
                  setActiveDashboardView(v as typeof activeDashboardView)
                }
                className="w-full"
              >
                <TabsList className="w-full justify-start h-11 bg-white overflow-x-auto flex-nowrap">
                  {dashboardViews.map((view) => {
                    const Icon = view.icon;
                    return (
                      <TabsTrigger
                        key={view.id}
                        value={view.id}
                        className="flex items-center gap-2 px-4 py-2 whitespace-nowrap"
                      >
                        <Icon className="h-4 w-4" />
                        {view.label}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </Tabs>
              <div className="mt-6">{renderDashboardContent()}</div>
            </div>
          )}
          {activeTab === "reports" && <ReportsPage />}
          {activeTab === "workers" && <WorkersPage />}
          {activeTab === "settings" && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <p className="text-gray-500">
                Configure farm management settings here.
              </p>
            </div>
          )}
        </div>
      </main>

      <ActionFAB isOpen={false} />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default HomePage;
