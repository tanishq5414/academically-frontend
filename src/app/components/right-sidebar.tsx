import { useUserInfoQuery } from "@/app/api/queries";
import { Loader } from "@/components/ui/loader";
import Image from "next/image";
import { useState } from "react";

const RightSidebar = () => {
  const { data: user, isLoading } = useUserInfoQuery();
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(currentDate.setMonth(
      currentDate.getMonth() + (direction === 'next' ? 1 : -1)
    )));
  };

  // Get previous month's last days
  const getPrevMonthDays = () => {
    const prevMonthLastDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();

    return [...Array(firstDayOfMonth)].map((_, index) => ({
      date: prevMonthLastDate - firstDayOfMonth + index + 1,
      isCurrentMonth: false
    }));
  };

  if (isLoading) {
    return <Loader className="h-8 w-8 animate-spin" />
  }

  return (
    <div className="h-full w-full overflow-y-auto px-4 pt-8">
      <div className="flex flex-col items-start">
        <h1 className="text-3xl font-semibold text-gray-600">Profile</h1>
      </div>
      <div className="flex flex-col items-center align-top items-start px-4 pt-8">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
          <Image
            src={user?.avatar || "/images/default-avatar.png"}
            alt="Profile"
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="mt-4 text-lg font-semibold">{user?.name}</h2>
        <p className="text-sm text-gray-500">{user?.email}</p>
        <p className="text-sm text-gray-500">{user?.role}</p>
      </div>

      <div className="mt-8 w-full">
        <div className="rounded-lg"> 
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1">
              <h2 className="text-base font-medium">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-y-2 text-center text-xs">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-gray-500 font-medium">
                {day}
              </div>
            ))}

            {getPrevMonthDays().map((day, index) => (
              <div key={`prev-${index}`} className="p-2 text-gray-300">
                {day.date}
              </div>
            ))}

            {[...Array(daysInMonth)].map((_, index) => {
              const isToday =
                index + 1 === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear();

              return (
                <div
                  key={index + 1}
                  className={`p-2 relative ${isToday
                      ? 'text-white'
                      : 'text-gray-900 hover:bg-gray-100'
                    }`}
                >
                  {isToday && (
                    <div className="absolute inset-0 m-auto w-7 h-7 bg-purple-600 rounded-full" />
                  )}
                  <span className={`relative z-10 ${isToday ? 'font-medium' : ''}`}>
                    {index + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;