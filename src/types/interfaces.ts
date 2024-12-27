export interface ICourse {
  id: string;
  title: string;
  description: string;
  instructorName: string;
  image?: string;
  status: CourseStatus;
  category: CourseCategory;
  createdAt: Date;
  updatedAt: Date;
  isEnrolled?: boolean;
}

export type CourseFormData = Omit<ICourse, 'id' | 'createdAt' | 'updatedAt' | 'isEnrolled'>;
export enum CourseStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export enum CourseCategory {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface UserCoursesResponse {
  success: boolean;
  data: {
    [key: string]: ICourse;
  };
}
