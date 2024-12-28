import Image from "next/image";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ICourse, UserRole, CourseCategory } from "@/types/interfaces";
import { useState } from "react";
import { useCoursesQuery, useEnrollCourseMutation, useUserCoursesQuery, useUserInfoQuery, useDeleteCourseMutation, useUpdateCourseMutation } from "@/app/api/queries";
import { Loader } from "@/components/ui/loader";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CoursesGridProps {
  showAll?: boolean;
  title?: string;
}

const CoursesGrid = ({ showAll = false, title }: CoursesGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    category: "" as CourseCategory,
    instructorName: "",
  });

  const { data: coursesResponse, isLoading } = useCoursesQuery();
  const { mutate: enrollMutation } = useEnrollCourseMutation();
  const { data: userCourses } = useUserCoursesQuery();
  const { data: user } = useUserInfoQuery();
  const { mutate: updateCourse } = useUpdateCourseMutation();
  const { mutate: deleteCourse } = useDeleteCourseMutation();

  const onEnroll = (courseId: string) => {
    enrollMutation(courseId);
  };

  const filteredCourses = coursesResponse
    ? Object.values(coursesResponse)
      // First sort by match type (title -> instructor -> category -> description)
      .sort((a, b) => {
        const aTitle = a?.title?.toLowerCase() || '';
        const bTitle = b?.title?.toLowerCase() || '';
        const searchLower = searchTerm.toLowerCase();

        // If title matches, prioritize it
        if (aTitle.includes(searchLower) && !bTitle.includes(searchLower)) return -1;
        if (!aTitle.includes(searchLower) && bTitle.includes(searchLower)) return 1;

        // Then check instructor
        const aInstructor = a?.instructorName?.toLowerCase() || '';
        const bInstructor = b?.instructorName?.toLowerCase() || '';
        if (aInstructor.includes(searchLower) && !bInstructor.includes(searchLower)) return -1;
        if (!aInstructor.includes(searchLower) && bInstructor.includes(searchLower)) return 1;

        // Then category
        const aCategory = a?.category?.toLowerCase() || '';
        const bCategory = b?.category?.toLowerCase() || '';
        if (aCategory.includes(searchLower) && !bCategory.includes(searchLower)) return -1;
        if (!aCategory.includes(searchLower) && bCategory.includes(searchLower)) return 1;

        return 0;
      })
      .filter(
        (course) =>
          course?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course?.instructorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course?.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course?.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const displayedCourses = showAll ? filteredCourses : filteredCourses.slice(0, 4);

  const renderEnrollButton = (course: ICourse) => {
    const isEnrolled = userCourses &&
      Object.values(userCourses).some(userCourse => userCourse?.id === course?.id);
    if (user?.role === UserRole.ADMIN) {
      return (
        <></>
      );
    }

    if (isEnrolled) {
      return (
        <p className="w-full text-left text-xs text-gray-500">
          Already Enrolled
        </p>
      );
    }

    return (
      <p
        className="w-full text-left text-xs hover:underline cursor-pointer"
        onClick={() => onEnroll(course.id)}
      >
        Enroll Now
      </p>
    );
  };

  const handleEditClick = (course: ICourse) => {
    setSelectedCourse(course);
    setEditFormData({
      title: course.title,
      description: course.description || "",
      category: course.category || "",
      instructorName: course.instructorName || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (courseId: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      deleteCourse(courseId);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCourse) {
      updateCourse({
        id: selectedCourse.id,
        ...editFormData,
      });
      setIsEditDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-10 gap-4 md:gap-0">
        <h1 className="text-3xl md:text-4xl font-semibold">{title}</h1>
        <div className="flex flex-col w-full md:max-w-md md:ml-8">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 bg-white rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Courses Section */}
      {displayedCourses.length > 0 && (
        <>
          <div>
            <h1 className="text-xl md:text-2xl font-normal mb-4">
              {searchTerm ? 'Search Results' : (showAll ? 'All Courses' : 'New Courses')}
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-4 gap-4 md:gap-6 pb-6 mb-6">
            {displayedCourses.map((course: ICourse, index: number) => (
              <div key={course.id} className="w-full">
                <div
                  className={`
                    rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow h-full 
                    flex flex-col justify-between align-left
                    ${index % 3 === 0
                      ? "bg-[#e5f3ff]"
                      : index % 3 === 1
                        ? "bg-[#e9e3ff]"
                        : "bg-[#fff0e1]"
                    }
                  `}
                >
                  <div className="flex flex-col justify-between h-full w-full">
                    <div className={`flex flex-col items-center rounded-lg px-10 justify-center h-[8rem] md:h-[10rem] mb-2 ${index % 3 === 0 ? 'bg-[#569be2]' : index % 3 === 1 ? 'bg-[#8970d5]' : 'bg-[#fcaa5d]'}`}>
                      <div className="flex flex-row items-center justify-center h-full rounded-lg">
                        <Image
                          src={'/images/logo.png'}
                          alt={course.title}
                          width={40}
                          height={40}
                          className={
                            !course.image
                              ? "center"
                              : "w-full h-full object-contain "
                          }
                        />
                        <div className="flex flex-col items-start justify-center h-full rounded-lg mx-2">
                          <h3 className="text-sm md:text-sm font-medium text-start text-white line-clamp-3">{course.title.split(' ')[0]}</h3>
                          <span className="text-xs md:text-xs text-white-500">by Academically</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs md:text-sm font-medium mb-2">{course.title}</h3>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                      <span className="text-xs md:text-sm text-gray-500">
                        {course.category} • {course.instructorName}
                      </span>
                      <div className="flex justify-between items-center">
                        {renderEnrollButton(course)}
                        {user?.role === UserRole.ADMIN && (
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditClick(course)}
                              className="h-8 w-8"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteClick(course.id)}
                              className="h-8 w-8"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {filteredCourses.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No courses found matching your search.
        </div>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={editFormData.title}
                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select
                value={editFormData.category}
                onValueChange={(value) => setEditFormData({ ...editFormData, category: value as CourseCategory })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BEGINNER">Beginner</SelectItem>
                  <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                  <SelectItem value="ADVANCED">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Instructor Name</label>
              <Input
                value={editFormData.instructorName}
                onChange={(e) => setEditFormData({ ...editFormData, instructorName: e.target.value })}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CoursesGrid; 