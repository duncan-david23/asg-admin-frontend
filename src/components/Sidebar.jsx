import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import { supabase } from '../utils/supabase'
// import { useAppContext } from '../contexts/AppContext'

const Sidebar = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    // const {profileName, profileEmail, profileImageUrl} = useAppContext()

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
</svg>
 },
        { name: 'Investors', path: '/investors', icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
</svg>
},
        { name: 'Transactions', path: '/transactions', icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

 },
    ]



     const handleSignOut = async () => {
        // const { error } = await supabase.auth.signOut();
        // if (error) {
        //     console.error('Error signing out:', error.message);
        // } else {
        //     console.log('Signed out successfully');
        //     window.location.href = '/login'; 
        //     localStorage.removeItem('accessToken');
        //     localStorage.removeItem('userId');
        //     localStorage.removeItem('userEmail');
        //     localStorage.removeItem('business_name');
        // }
    };


  return (
    <>
      {/* Mobile Toggle Button - Only shows when sidebar is closed */}
      {!isMobileOpen && (
        <button 
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-100 shadow-gray-800 rounded-full shadow-md"
          onClick={() => setIsMobileOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"/>
          </svg>
        </button>
      )}

    


      {/* Sidebar */}
      <div className={`
        fixed lg:relative 
        w-[250px] lg:w-[250px] 
        h-screen bg-gray-800 p-5 
        transform transition-transform duration-300 ease-in-out z-40
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header with Close Button */}
        <div className='flex items-center justify-between'>
          {/* <div className='flex items-center gap-2.5'>
            <img 
              src={profileImageUrl} 
              alt="" 
              className='rounded-full w-10 h-10' 
            />
            <div className="lg:block">
              <span className='text-sm'>{profileEmail&& profileEmail}</span>
              <p className='text-xs text-gray-500'>{profileName}</p>
            </div>
          </div> */}
          
          {/* Close Button - Only visible on mobile when sidebar is open */}
          <button 
            className="lg:hidden p-1 hover:bg-gray-200 rounded "
            onClick={() => setIsMobileOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-white mb-2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div>
            <p className='font-thin text-sm text-white px-[10px] py-[3px] w-[100px] rounded-full bg-green-500'>Admin Panel</p>
            <p className='font-bold text-white mt-[10px]'>Asos Global</p>
        </div>
        <div className='h-px w-full bg-gray-300 mt-5'></div>
        
        {/* Menu Items */}
        <ul className='md:mt-10'>
          {menuItems.map(item => (
            <li 
              key={item.name} 
              className={`
                group py-2.5 md:my-4 px-[15px] font-thin text-white 
                hover:border border-white hover:text-white rounded-md 
                mb-2 cursor-pointer flex items-center gap-3 
                ${window.location.pathname === item.path ? 'border border-white text-white' : ''}
              `}
              onClick={() => setIsMobileOpen(false)}
            >
              {item.icon}
              {/* Link names always visible */}
              <Link to={item.path} className="flex-1">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout Button */}

          <div onClick={handleSignOut} className='flex items-center gap-2.5 absolute bottom-5 border text-white border-gray-300 py-1.5 px-4 rounded-md cursor-pointer hover:scale-105 transition-all mb-[100px]'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
            <span className='text-sm font-thin'>Logout</span>
          </div>
        
      </div>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0  bg-opacity-50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar