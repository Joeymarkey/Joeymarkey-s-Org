import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2 } from 'lucide-react';

export function ClassDiagram() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code2 className="w-5 h-5" />
          Class Structure (OOP Concepts)
        </CardTitle>
        <CardDescription>
          Understanding how classes and objects work in this system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Student Class */}
          <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <h3 className="font-bold mb-2">Student Class</h3>
            <div className="text-sm space-y-1">
              <div className="font-mono text-xs bg-white/50 dark:bg-black/20 p-2 rounded">
                <div className="font-semibold mb-1">Properties:</div>
                <div className="ml-4">
                  • id: string<br />
                  • firstName: string<br />
                  • lastName: string<br />
                  • email: string<br />
                  • major: string<br />
                  • gpa: number<br />
                  • enrollmentYear: number
                </div>
              </div>
              <div className="font-mono text-xs bg-white/50 dark:bg-black/20 p-2 rounded mt-2">
                <div className="font-semibold mb-1">Methods:</div>
                <div className="ml-4">
                  • getFullName(): string<br />
                  • getAcademicStatus(): string<br />
                  • getYearLevel(): string<br />
                  • toString(): string
                </div>
              </div>
            </div>
          </div>

          {/* StudentManagementSystem Class */}
          <div className="border rounded-lg p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <h3 className="font-bold mb-2">StudentManagementSystem Class</h3>
            <div className="text-sm space-y-1">
              <div className="font-mono text-xs bg-white/50 dark:bg-black/20 p-2 rounded">
                <div className="font-semibold mb-1">Properties:</div>
                <div className="ml-4">
                  • students: Student[]
                </div>
              </div>
              <div className="font-mono text-xs bg-white/50 dark:bg-black/20 p-2 rounded mt-2">
                <div className="font-semibold mb-1">Methods:</div>
                <div className="ml-4">
                  • addStudent(student)<br />
                  • removeStudent(id)<br />
                  • searchByName(name)<br />
                  • searchById(id)<br />
                  • searchByMajor(major)<br />
                  • getAllStudents()<br />
                  • getAverageGPA()<br />
                  • sortByGPA()<br />
                  • sortByName()
                </div>
              </div>
            </div>
          </div>

          {/* Key Concepts */}
          <div className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <h3 className="font-bold mb-2">OOP Concepts Demonstrated</h3>
            <div className="text-sm space-y-2">
              <div>
                <span className="font-semibold">Encapsulation:</span> Data and methods are bundled together in classes
              </div>
              <div>
                <span className="font-semibold">Abstraction:</span> Complex operations are simplified through methods
              </div>
              <div>
                <span className="font-semibold">Objects:</span> Each student is an instance (object) of the Student class
              </div>
              <div>
                <span className="font-semibold">Methods:</span> Functions that operate on object data (e.g., getFullName())
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
