import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Brain, Calendar, Clock } from "lucide-react";

interface Task {
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
}

interface TaskManagementBoardProps {
  tasks?: Task[];
  onTaskMove?: (
    taskId: string,
    newStatus: "todo" | "in-progress" | "done",
  ) => void;
}

const defaultTasks: Task[] = [
  {
    id: "1",
    title: "Feed Livestock",
    description: "Distribute morning feed to cattle in Section A",
    status: "todo",
    dueDate: "2024-02-20",
    aiSuggestion:
      "Recommended: John Smith has the most experience with Section A",
  },
  {
    id: "2",
    title: "Health Check",
    description: "Routine health inspection for dairy cows",
    status: "in-progress",
    assignee: {
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    dueDate: "2024-02-20",
  },
  {
    id: "3",
    title: "Clean Stables",
    description: "Daily cleaning of horse stables",
    status: "done",
    assignee: {
      name: "Mike Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    },
    dueDate: "2024-02-19",
  },
];

const TaskCard = ({ task }: { task: Task }) => (
  <Card className="p-4 mb-3 bg-white shadow-sm">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-medium">{task.title}</h3>
      {task.assignee && (
        <Avatar className="w-8 h-8">
          <img src={task.assignee.avatar} alt={task.assignee.name} />
        </Avatar>
      )}
    </div>
    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <Calendar className="w-4 h-4" />
      <span>{task.dueDate}</span>
    </div>
    {task.aiSuggestion && (
      <div className="mt-2 p-2 bg-blue-50 rounded-md flex items-start gap-2">
        <Brain className="w-4 h-4 text-blue-500 mt-1" />
        <p className="text-sm text-blue-700">{task.aiSuggestion}</p>
      </div>
    )}
  </Card>
);

const TaskColumn = ({
  title,
  tasks,
  status,
}: {
  title: string;
  tasks: Task[];
  status: string;
}) => (
  <div className="flex-1 min-w-[300px] bg-gray-50 rounded-lg p-4">
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-semibold text-gray-700">{title}</h2>
      <Badge variant="secondary">{tasks.length}</Badge>
    </div>
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  </div>
);

const TaskManagementBoard = ({
  tasks = defaultTasks,
  onTaskMove,
}: TaskManagementBoardProps) => {
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
          <p className="text-gray-500">
            Drag and drop tasks to update their status
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          View Timeline
        </Button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        <TaskColumn title="To Do" tasks={todoTasks} status="todo" />
        <TaskColumn
          title="In Progress"
          tasks={inProgressTasks}
          status="in-progress"
        />
        <TaskColumn title="Done" tasks={doneTasks} status="done" />
      </div>
    </div>
  );
};

export default TaskManagementBoard;
