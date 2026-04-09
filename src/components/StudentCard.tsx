import React from 'react';
import { Student } from '../models/Student';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, GraduationCap, Trash2, Award, Calendar } from 'lucide-react';

interface StudentCardProps {
  student: Student;
  onDelete: (id: string) => void;
}

export function StudentCard({ student, onDelete }: StudentCardProps) {
  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.5) return 'bg-green-500';
    if (gpa >= 3.0) return 'bg-blue-500';
    if (gpa >= 2.0) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{student.getFullName()}</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="font-mono text-xs">
                {student.id}
              </Badge>
              <Badge className={getGPAColor(student.gpa)}>
                GPA: {student.gpa.toFixed(2)}
              </Badge>
              <Badge variant="outline">{student.getYearLevel()}</Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(student.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="w-4 h-4 text-muted-foreground" />
            <span>{student.major}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{student.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              Enrolled: {student.enrollmentYear}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm pt-2 border-t">
            <Award className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{student.getAcademicStatus()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
