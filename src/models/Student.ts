/**
 * Student Class - Represents a real student with their details
 * Demonstrates Object-Oriented Programming concepts
 */
export class Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  major: string;
  gpa: number;
  enrollmentYear: number;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    major: string,
    gpa: number,
    enrollmentYear: number
  ) {
    this.id = this.generateId();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.major = major;
    this.gpa = gpa;
    this.enrollmentYear = enrollmentYear;
  }

  /**
   * Generates a unique student ID
   */
  private generateId(): string {
    return 'STU' + Date.now() + Math.random().toString(36).substring(2, 9).toUpperCase();
  }

  /**
   * Returns the full name of the student
   */
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  /**
   * Returns the academic status based on GPA
   */
  getAcademicStatus(): string {
    if (this.gpa >= 3.5) return "Dean's List";
    if (this.gpa >= 3.0) return 'Good Standing';
    if (this.gpa >= 2.0) return 'Satisfactory';
    return 'Academic Probation';
  }

  /**
   * Calculates the year level based on enrollment year
   */
  getYearLevel(): string {
    const currentYear = new Date().getFullYear();
    const yearsPassed = currentYear - this.enrollmentYear;
    
    if (yearsPassed === 0) return 'Freshman';
    if (yearsPassed === 1) return 'Sophomore';
    if (yearsPassed === 2) return 'Junior';
    if (yearsPassed >= 3) return 'Senior';
    return 'Not Enrolled';
  }

  /**
   * Returns a formatted string representation of the student
   */
  toString(): string {
    return `${this.getFullName()} (${this.id}) - ${this.major} - GPA: ${this.gpa}`;
  }
}
