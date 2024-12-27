import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCourses, getUserCourses, getUserInfo, enrollInCourse, createCourse } from "@/lib/api";
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