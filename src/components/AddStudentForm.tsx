import React, { useState } from 'react';
import { Student } from '../models/Student';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';

interface AddStudentFormProps {
  onAddStudent: (student: Student) => void;
}

export function AddStudentForm({ onAddStudent }: AddStudentFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    major: '',
    gpa: '',
    enrollmentYear: new Date().getFullYear().toString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const student = new Student(
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.major,
      parseFloat(formData.gpa),
      parseInt(formData.enrollmentYear)
    );

    onAddStudent(student);

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      major: '',
      gpa: '',
      enrollmentYear: new Date().getFullYear().toString(),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.major.trim() !== '' &&
      formData.gpa !== '' &&
      parseFloat(formData.gpa) >= 0 &&
      parseFloat(formData.gpa) <= 4.0 &&
      formData.enrollmentYear !== ''
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Add New Student
        </CardTitle>
        <CardDescription>
          Create a new student object with their information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@college.edu"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="major">Major</Label>
            <Input
              id="major"
              name="major"
              value={formData.major}
              onChange={handleChange}
              placeholder="Computer Science"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gpa">GPA (0.0 - 4.0)</Label>
              <Input
                id="gpa"
                name="gpa"
                type="number"
                step="0.01"
                min="0"
                max="4"
                value={formData.gpa}
                onChange={handleChange}
                placeholder="3.75"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="enrollmentYear">Enrollment Year</Label>
              <Input
                id="enrollmentYear"
                name="enrollmentYear"
                type="number"
                min="1900"
                max="2100"
                value={formData.enrollmentYear}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={!isFormValid()}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
