import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
  const [isUsersPage, setIsUsersPage] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { pathname } = window.location;
      setIsUsersPage(pathname === '/users');
    }
  }, []);

  return (
    <div className='bg-blue-200 w-full py-5 px-5 md:px-10 flex items-center justify-between'>
      <div className='w-full flex items-center space-x-4 md:space-x-6'>
        <h1 className='font-bold text-xl md:text-3xl text-blue-500'>Synapsis<span className='text-blue-400 text-lg md:text-2xl'>Blog</span></h1>
      </div>
      <Link href={isUsersPage ? '/' : '/users'} className='bg-blue-500 px-4 py-2 ml-4 text-xs md:text-sm text-white font-medium hover:bg-blue-600 rounded-xl lg:rounded-lg'>{isUsersPage ? 'Logout' : 'Login'}</Link>
    </div>
  )
}

export default Navbar