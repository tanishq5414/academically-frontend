'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { getUserInfo } from '@/lib/api';

import { Loader } from '@/components/ui/loader';

export default function HomePage() {
  const router = useRouter();

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 5,
  });

  if (!isLoading) {
    if (userInfo) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }

  return <div className="flex justify-center items-center h-screen bg-[#f6f2eb]">
    <Loader />
  </div>;
}
