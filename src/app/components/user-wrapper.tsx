'use client';
import Navbar from '@/app/components/navbar';
import Sidebar from '@/app/components/sidebar';
import RightSidebar from '@/app/components/right-sidebar';
import { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';

export default function UserWrapper({ children }: { children: React.ReactNode }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fbfbfb]">
      {!token && <Navbar isLoggedIn={!!token} />}

      {/* Mobile menu button - only show when logged in */}
      {token && (
        <button
          onClick={toggleSidebar}
          className="xl:hidden fixed top-4 left-4 z-50 p-2 rounded-md shadow-md bg-[#fbfbfb]"
        >
          {isSidebarOpen ? (
            <XIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      )}

      <div className={`flex-1 ${!token ? '' : 'md:grid xl:grid-cols-[320px,1fr,320px]'}`}>
        {token && (
          <div
            className={`
              fixed xl:relative
              inset-y-0 left-0
              transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              xl:translate-x-0
              transition duration-200 ease-in-out
              z-30 xl:z-0
              bg-[#fbfbfb]
              w-[280px]
              shadow-lg xl:shadow-none
              overflow-hidden
            `}
          >
            <Sidebar />
          </div>
        )}

        <div className="h-full w-full overflow-y-auto px-4 xl:px-8 pt-8 xl:pt-6">
          {children}
        </div>

        {token && (
          <div className="hidden xl:block w-[280px]">
            <RightSidebar />
          </div>
        )}
      </div>

      {token && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 xl:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}