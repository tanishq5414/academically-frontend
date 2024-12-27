"use client";
import CoursesGrid from "@/app/components/courses-grid";

const CoursesPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-2 bg-[#fbfbfb]">
      <div className="w-full max-w-[90rem] px-4">
        <CoursesGrid showAll title="Courses" />
      </div>
    </div>
  );
};

export default CoursesPage;
