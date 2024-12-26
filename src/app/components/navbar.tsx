"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className='fixed top-0 left-0 right-0 flex justify-between items-center px-12 py-6 bg-[#fcfcfc]'>
      <div>
        <Link href='/'>
          <div className='flex items-center gap-2'>
            <Image src='/images/logo.png' alt='logo' width={50} height={50} />
            <h1 className='text-xl font-normal italic'>Acadamically Global</h1>
          </div>
        </Link>
      </div>
      <div>
        {pathname === '/login' ? (
          <Link href='/signup'>
            <Button className='bg-white text-black hover:bg-purple-500 hover:text-white px-6 py-6'>
              Sign Up
            </Button>
          </Link>
        ) : pathname === '/signup' ? (
          <Link href='/login'>
            <Button className='bg-white text-black hover:bg-purple-500 hover:text-white px-6 py-6'>
              Login
            </Button>
          </Link>
        ) : (
          <Link href='/signup'>
            <Button className='bg-white text-black hover:bg-purple-500 hover:text-white px-6 py-6'>
              Sign Up
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;