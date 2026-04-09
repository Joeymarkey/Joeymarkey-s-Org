import React, { useState, useEffect } from 'react';
import { Student } from './models/Student';
import { StudentManagementSystem } from './models/StudentManagementSystem';
import { AddStudentForm } from './components/AddStudentForm';
import { SearchStudents } from './components/SearchStudents';
import { StudentCard } from './components/StudentCard';
import { SystemStatistics } from './components/SystemStatistics';
import { ClassDiagram } from './components/ClassDiagram';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Users, Code2, ArrowUpDown } from 'lucide-react';
import { toast, Toaster } from 'sonner';

export default function App() {
  // Initialize the Student Management System (singleton instance)
  const [system] = useState(() => new StudentManagementSystem());
  const [displayedStudents, setDisplayedStudents] = useState<Student[]>([]);
  const [sortOrder, setSortOrder] = useState<'name' | 'gpa'>('name');
  const [refreshKey, setRefreshKey] = useState(0);

  // Initialize with sample data
  useEffect(() => {
    const sampleStudents = [
      new Student('Emma', 'Johnson', 'emma.j@college.edu', 'Computer Science', 3.85, 2023),
      new Student('Michael', 'Chen', 'michael.c@college.edu', 'Mathematics', 3.92, 2022),
      new Student('Sarah', 'Williams', 'sarah.w@college.edu', 'Physics', 3.45, 2024),
      new Student('James', 'Brown', 'james.b@college.edu', 'Computer Science', 3.20, 2023),
      new Student('Olivia', 'Davis', 'olivia.d@college.edu', 'Biology', 3.68, 2022),
    ];

    sampleStudents.forEach(student => system.addStudent(student));
    updateDisplay();
  }, []);

  const updateDisplay = () => {
    const students = sortOrder === 'name' 
      ? system.sortByName() 
      : system.sortByGPA();
    setDisplayedStudents(students);
    setRefreshKey(prev => prev + 1); // Force statistics update
  };

  const handleAddStudent = (student: Student) => {
    system.addStudent(student);
    updateDisplay();
    toast.success(`Student object created: ${student.getFullName()}`, {
      description: `ID: ${student.id}`,
    });
  };

  const handleDeleteStudent = (id: string) => {
    const student = system.searchById(id);
    if (student && system.removeStudent(id)) {
      updateDisplay();
      toast.success(`Student removed: ${student.getFullName()}`);
    }
  };

  const handleSearch = (searchType: string, searchTerm: string) => {
    if (!searchTerm.trim()) {
      updateDisplay();
      return;
    }

    let results: Student[] = [];
    switch (searchType) {
      case 'name':
        results = system.searchByName(searchTerm);
        break;
      case 'id':
        const student = system.searchById(searchTerm);
        results = student ? [student] : [];
        break;
      case 'major':
        results = system.searchByMajor(searchTerm);
        break;
    }

    setDisplayedStudents(results);
  };

  const toggleSort = () => {
    const newSort = sortOrder === 'name' ? 'gpa' : 'name';
    setSortOrder(newSort);
    const students = newSort === 'name' 
      ? system.sortByName() 
      : system.sortByGPA();
    setDisplayedStudents(students);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Student Information System</h1>
              <p className="text-muted-foreground">
                Object-Oriented Programming with Classes & Objects
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="add" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Add
            </TabsTrigger>
            <TabsTrigger value="classes" className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Classes
            </TabsTrigger>
          </TabsList>

          {/* Statistics */}
          <SystemStatistics system={system} refreshKey={refreshKey} />

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <SearchStudents onSearch={handleSearch} />
              </div>
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">
                    Student Objects ({displayedStudents.length})
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleSort}
                    className="flex items-center gap-2"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                    Sort by {sortOrder === 'name' ? 'GPA' : 'Name'}
                  </Button>
                </div>
                {displayedStudents.length === 0 ? (
                  <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-lg border">
                    <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No students found</h3>
                    <p className="text-muted-foreground">
                      Add a new student or adjust your search criteria
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {displayedStudents.map(student => (
                      <div key={student.id}>
                        <StudentCard
                          student={student}
                          onDelete={handleDeleteStudent}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Add Student Tab */}
          <TabsContent value="add">
            <div className="max-w-2xl mx-auto">
              <AddStudentForm onAddStudent={handleAddStudent} />
            </div>
          </TabsContent>

          {/* Classes Tab */}
          <TabsContent value="classes">
            <ClassDiagram />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
