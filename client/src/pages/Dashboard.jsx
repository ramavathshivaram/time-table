import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Users, BookOpen, Clock3 } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Timetables",
      value: "24",
      icon: CalendarDays,
    },
    {
      title: "Departments",
      value: "9",
      icon: BookOpen,
    },
    {
      title: "Faculty Members",
      value: "120",
      icon: Users,
    },
    {
      title: "Scheduled Hours",
      value: "340",
      icon: Clock3,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and generate smart timetables easily.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{item.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
