'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ICourse, CourseStatus, CourseCategory, CourseFormData } from '@/types/interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCreateCourseMutation, useUserInfoQuery } from '@/app/api/queries';
import { toast } from '@/hooks/use-toast';
import { createCourse } from '@/lib/api';


const AddCourse = () => {
  const router = useRouter();

  const {data: user} = useUserInfoQuery();

  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    description: '',
    instructorName: user?.name || '',
    category: CourseCategory.BEGINNER,
    status: CourseStatus.DRAFT,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const queryClient = useQueryClient();

const { mutate: createCourseMutation } = useMutation<ICourse, Error, CourseFormData>({
    mutationFn: async (values: CourseFormData): Promise<ICourse> => {
      const response = await createCourse(values);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({
        title: 'Course created successfully',
        description: 'You can now view your course in the courses page',
      });
      router.push('/courses');

    },
    onError: (error: Error) => {
      toast({
        title: 'Error creating course',
        description: 'Please try again',
      });
    },
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCourseMutation(formData);
    setFormData({
      title: '',
      description: '',
      instructorName: user?.name || '',
      category: CourseCategory.BEGINNER,
      status: CourseStatus.DRAFT,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Course</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Course Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            {Object.values(CourseCategory).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            {Object.values(CourseStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="instructorName" className="block text-sm font-medium mb-1">
            Instructor Name
          </label>
          <input
            type="text"
            id="instructorName"
            name="instructorName"
            value={formData.instructorName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;