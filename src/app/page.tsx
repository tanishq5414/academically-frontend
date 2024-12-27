'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/lib/api';
import { Loader } from '@/components/ui/loader';
import DashboardPage from '@/app/dashboard/page';
import LoginPage from '@/app/(auth)/login/page';
import { redirect } from 'next/navigation';
import { UserRole } from '@/types/interfaces';

export default function HomePage() {
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full bg-[#fbfbfb]">
        <Loader />
      </div>
    );
  }

  // If user is logged in, show dashboard content
  if (userInfo && userInfo.role === UserRole.ADMIN) {
    redirect('/courses');
  }

  if (userInfo && userInfo.role === UserRole.USER) {
    redirect('/dashboard');
  }

  // If user is not logged in, show login form
  redirect('/login');
}
