import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, ClipboardList, HeartPulse, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionFABProps {
  onAddTask?: () => void;
  onRecordHealth?: () => void;
  onGenerateReport?: () => void;
  isOpen?: boolean;
}

const ActionFAB = ({
  onAddTask = () => console.log("Add task clicked"),
  onRecordHealth = () => console.log("Record health clicked"),
  onGenerateReport = () => console.log("Generate report clicked"),
  isOpen = true,
}: ActionFABProps) => {
  return (
    <div className="fixed bottom-20 right-4 z-50 bg-transparent">
      <DropdownMenu open={isOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
            size="icon"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 mt-2">
          <DropdownMenuItem onClick={onAddTask}>
            <ClipboardList className="mr-2 h-4 w-4" />
            <span>Add New Task</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onRecordHealth}>
            <HeartPulse className="mr-2 h-4 w-4" />
            <span>Record Health Incident</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onGenerateReport}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Generate Report</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ActionFAB;
