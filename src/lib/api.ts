import { CourseFormData, IUser } from "@/types/interfaces";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.baseURL = baseUrl;

axios.defaults.headers.common['Content-Type'] = 'application/json';

//add token to headers
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function getUserInfo(): Promise<IUser | null> {
  if (!localStorage.getItem('token')) {
    return null;
  }
  const response = await axios.post(`${baseUrl}/user/getUserById`, {}, {
  });
  return response.data.data;
}

export async function signIn(email: string, password: string) {
  const response = await axios.post(`${baseUrl}/auth/signIn`, {
    email: email,
    password: password,
  }, {
    withCredentials: true,
  });
  return response.data;
}

export async function signUp(name: string, email: string, password: string) {
  const response = await axios.post(`${baseUrl}/auth/signup`, {
    name,
    email,
    password,
  });
  return response.data;
}

export async function getCourses() {
  const response = await axios.post(`${baseUrl}/course/getAllCourses`);
  return response.data.data;
}

export const getUserCourses = async () => {
  const response = await axios.post(`${baseUrl}/course/getCourseByUserId`, {}, {
    withCredentials: true,
  });
  return response.data.data;
};

export const enrollInCourse = async (courseId: string) => {
  console.log(`Enrolling in course: ${courseId}`);
  const response = await axios.post(`${baseUrl}/course/enrollInCourse`, {
    courseId,
  });
  return response.data.data;
};

export const createCourse = async (formData: CourseFormData) => {
  const response = await axios.post(`${baseUrl}/course/createCourse`, formData);
  return response.data.data;
};

