import { Student } from './Student';

/**
 * StudentManagementSystem Class - Manages a collection of students
 * Demonstrates how objects work together in a system
 */
export class StudentManagementSystem {
  private students: Student[];

  constructor() {
    this.students = [];
  }

  /**
   * Adds a new student to the system
   */
  addStudent(student: Student): void {
    this.students.push(student);
  }

  /**
   * Removes a student by ID
   */
  removeStudent(id: string): boolean {
    const initialLength = this.students.length;
    this.students = this.students.filter(student => student.id !== id);
    return this.students.length < initialLength;
  }

  /**
   * Searches for students by name (first or last name)
   */
  searchByName(name: string): Student[] {
    const searchTerm = name.toLowerCase();
    return this.students.filter(student =>
      student.firstName.toLowerCase().includes(searchTerm) ||
      student.lastName.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Searches for a student by ID
   */
  searchById(id: string): Student | undefined {
    return this.students.find(student => student.id === id);
  }

  /**
   * Searches for students by major
   */
  searchByMajor(major: string): Student[] {
    const searchTerm = major.toLowerCase();
    return this.students.filter(student =>
      student.major.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Gets all students
   */
  getAllStudents(): Student[] {
    return [...this.students];
  }

  /**
   * Gets total number of students
   */
  getTotalStudents(): number {
    return this.students.length;
  }

  /**
   * Gets students on Dean's List (GPA >= 3.5)
   */
  getDeansListStudents(): Student[] {
    return this.students.filter(student => student.gpa >= 3.5);
  }

  /**
   * Calculates the average GPA of all students
   */
  getAverageGPA(): number {
    if (this.students.length === 0) return 0;
    const total = this.students.reduce((sum, student) => sum + student.gpa, 0);
    return Number((total / this.students.length).toFixed(2));
  }

  /**
   * Gets students grouped by major
   */
  getStudentsByMajor(): Record<string, Student[]> {
    return this.students.reduce((acc, student) => {
      if (!acc[student.major]) {
        acc[student.major] = [];
      }
      acc[student.major].push(student);
      return acc;
    }, {} as Record<string, Student[]>);
  }

  /**
   * Updates student information
   */
  updateStudent(
    id: string,
    updates: Partial<Omit<Student, 'id' | 'generateId'>>
  ): boolean {
    const student = this.searchById(id);
    if (!student) return false;

    Object.assign(student, updates);
    return true;
  }

  /**
   * Sorts students by GPA (descending)
   */
  sortByGPA(): Student[] {
    return [...this.students].sort((a, b) => b.gpa - a.gpa);
  }

  /**
   * Sorts students by name (alphabetically)
   */
  sortByName(): Student[] {
    return [...this.students].sort((a, b) =>
      a.getFullName().localeCompare(b.getFullName())
    );
  }
}
