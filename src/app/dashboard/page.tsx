"use client";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo, getUserCourses } from "@/lib/api";
import { Loader } from "@/components/ui/loader";
import CoursesGrid from "@/app/components/courses-grid";
import Image from "next/image";
import { ICourse } from "@/types/interfaces";
import { useUserInfoQuery, useUserCoursesQuery } from "@/app/api/queries";

const DashboardPage = () => {
  const { data: user, isLoading: isUserLoading } = useUserInfoQuery();
  const {
    data: userCoursesResponse,
    isLoading: isCoursesLoading,
    error: coursesError
  } = useUserCoursesQuery();

  if (isUserLoading || isCoursesLoading) {
    return (
      <div className="flex items-center justify-center min-h-full bg-[#fbfbfb]">
        <Loader />
      </div>
    );
  }

  const userCourses = userCoursesResponse;

  if (coursesError) {
    return (
      <div className="flex items-center justify-center min-h-full bg-[#fbfbfb]">
        <p className="text-red-500">Error loading courses. Please try again later.</p>
      </div>
    );
  }

  const coursesArray = userCourses ? Object.values(userCourses) : [];

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-full py-2 bg-[#fbfbfb]">
        <div className="w-full flex flex-col items-center justify-center bg-[#fbfbfb]">
          <div className="w-full max-w-[90rem] px-4">
            <CoursesGrid title="Dashboard" />
          </div>
          <div className="w-full max-w-[90rem] px-4 mt-10">
            <h1 className="text-2xl font-normal mb-4">My Courses</h1>
            <div className="rounded-lg shadow-sm overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Course name</th>
                    <th className="hidden sm:table-cell px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Category</th>
                    <th className="hidden sm:table-cell px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Instructor</th>
                  </tr>
                </thead>
                <tbody>
                  {coursesArray.length > 0 ? (
                    coursesArray.map((course: ICourse) => (
                      <tr key={course.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-normal">
                          <div className="flex items-center">
                            <div className="w-8 h-8 relative mr-3 flex-shrink-0 bg">
                              <Image
                                src={course.image || "/svg/courses.svg"}
                                alt={course.title}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-bold">
                                {course.title.length > 25 ? course.title.substring(0, 25) + '...' : course.title}
                              </span>
                              <div className="sm:hidden">
                                <span className="text-xs text-gray-500 mt-1 mb-1">
                                  {course.category.length > 25 ? course.category.substring(0, 25) + '...' : course.category}
                                </span>
                                <span className="text-xs text-gray-500 mx-1">|</span>
                                <span className="text-xs text-gray-500">
                                  {course.instructorName.length > 25 ? course.instructorName.substring(0, 25) + '...' : course.instructorName}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {course.category}
                        </td>
                        <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {course.instructorName}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                        No courses found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;