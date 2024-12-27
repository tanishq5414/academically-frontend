"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenIcon, HomeIcon, LogOutIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import router from "next/router";
import { useUserCoursesQuery, useUserInfoQuery } from "@/app/api/queries";
import { UserRole } from "@/types/interfaces";

const Sidebar = () => {
  const pathname = usePathname();
  const { data: user } = useUserInfoQuery();

  const navigationItems = [
    {
      href: '/dashboard',
      icon: <HomeIcon className="w-6 h-6" />,
      label: 'Dashboard',
      role: [UserRole.USER]
    },
    {
      href: '/courses',
      icon: <BookOpenIcon className="w-6 h-6" />,
      label: 'Courses',
      role: [UserRole.ADMIN, UserRole.USER]
    },
    {
      href: '/add-course',
      icon: <PlusIcon className="w-6 h-6" />,
      label: 'Add Course',
      role: [UserRole.ADMIN]
    }
  ];

  const filteredNavigationItems = navigationItems.filter(item =>
    user?.role && item.role.includes(user.role)
  );

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };


  return (
    <div className="flex flex-col min-h-screen h-screen pt-10">
      <div className="flex flex-col flex-grow px-4 md:px-8 items-start">
        <div className="flex items-center gap-2 mb-8 hover:scale-105 transition-transform">
          <Link href="/dashboard">
            <Image src="/images/logo.png" alt="logo" width={50} height={50} />
          </Link>
          <h1 className="text-lg font-normal italic">Acadamically</h1>
        </div>

        <div className="flex flex-col space-y-2 w-full">
          {filteredNavigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg p-3 transition-all duration-200 relative
                ${pathname === item.href ? 'bg-purple-500 text-white scale-105 ' : 'hover:bg-gray-100 hover:scale-105'}`}
            >
              {item.icon}
              <span className={`text-sm ${pathname === item.href ? 'text-white' : 'text-gray-600'}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4 md:px-8 py-8 mt-auto">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg p-3 transition-all duration-200 hover:bg-gray-100 hover:scale-105"
        >
          <LogOutIcon className="w-6 h-6 text-gray-600" />
          <span className="text-sm text-gray-600">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;