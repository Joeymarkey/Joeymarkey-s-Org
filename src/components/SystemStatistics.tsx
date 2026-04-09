import React from 'react';
import { StudentManagementSystem } from '../models/StudentManagementSystem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Award, TrendingUp, BookOpen } from 'lucide-react';

interface SystemStatisticsProps {
  system: StudentManagementSystem;
  refreshKey?: number;
}

export function SystemStatistics({ system }: SystemStatisticsProps) {
  const totalStudents = system.getTotalStudents();
  const averageGPA = system.getAverageGPA();
  const deansListCount = system.getDeansListStudents().length;
  const majorGroups = system.getStudentsByMajor();
  const majorCount = Object.keys(majorGroups).length;

  const stats = [
    {
      title: 'Total Students',
      value: totalStudents,
      icon: Users,
      description: 'Student objects in system',
      color: 'text-blue-600',
    },
    {
      title: 'Average GPA',
      value: averageGPA.toFixed(2),
      icon: TrendingUp,
      description: 'Overall performance',
      color: 'text-green-600',
    },
    {
      title: "Dean's List",
      value: deansListCount,
      icon: Award,
      description: 'Students with GPA ≥ 3.5',
      color: 'text-purple-600',
    },
    {
      title: 'Majors',
      value: majorCount,
      icon: BookOpen,
      description: 'Different programs',
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <CardDescription className="text-xs mt-1">
                {stat.description}
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
