import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCourses,
  getUserCourses,
  getUserInfo,
  enrollInCourse,
  createCourse,
  updateCourse,
  deleteCourse
} from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { CourseFormData, ICourse } from "@/types/interfaces";
import { useRouter } from "next/navigation";


export const useCoursesQuery = () => {
  return useQuery<Record<string, ICourse>>({
    queryKey: ["courses"],
    queryFn: getCourses,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  });
};

export const useUserCoursesQuery = () => {
  return useQuery<Record<string, ICourse>>({
    queryKey: ["userCourses"],
    queryFn: getUserCourses,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUserInfoQuery = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useEnrollCourseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: string) => enrollInCourse(courseId),
    onSuccess: () => {
      toast({
        title: 'Course enrolled successfully',
        variant: 'default',
      });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["userCourses"] });
    },
    onError: () => {
      toast({
        title: 'Failed to enroll in course',
        variant: 'destructive',
      });
    },
  });
};


export const useCreateCourseMutation = () => {

};

export const useUpdateCourseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({
        title: 'Course updated successfully',
        variant: 'default',
      });
    },
    onError: () => {
      toast({
        title: 'Failed to update course',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteCourseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({
        title: 'Course deleted successfully',
        variant: 'default',
      });
    },
    onError: () => {
      toast({
        title: 'Failed to delete course',
        variant: 'destructive',
      });
    },
  });
};