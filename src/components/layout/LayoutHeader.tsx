// header.tsx
import React from 'react'
import { NavLink, useLocation } from 'react-router'

import { useSidebar } from '~/contexts/sidebar-context'

const navigtions = [
  { to: '/', name: 'Home' },
  { to: '/about', name: 'About' },
]

const LayoutHeader: React.FC = () => {
  const { toggleSidebar, sidebarOpen } = useSidebar()
  const location = useLocation()

  // 캘린더 페이지에서만 사이드바 토글 버튼을 표시
  const showSidebarToggle = location.pathname === '/'

  return (
    <header
      className='sticky top-0 flex items-center  px-4 py-3 h-16
      bg-gray-50/90 ring-1 ring-gray-900/10 backdrop-blur-sm'
    >
      <div className='flex items-center gap-2'>
        {showSidebarToggle && (
          <button
            onClick={toggleSidebar}
            className='relative w-6 h-6 flex items-center justify-center group'
            title={sidebarOpen ? '사이드바 숨기기' : '사이드바 보기'}
          >
            <span
              className={`block absolute h-0.5 w-4 bg-gray-600 transform transition duration-300 ease-in-out 
        ${sidebarOpen ? 'rotate-45 top-2.5' : 'top-1'}`}
            />
            <span
              className={`block absolute h-0.5 w-4 bg-gray-600 transition-all duration-300 ease-in-out 
        ${sidebarOpen ? 'opacity-0' : 'top-2.5'}`}
            />
            <span
              className={`block absolute h-0.5 w-4 bg-gray-600 transform transition duration-300 ease-in-out 
        ${sidebarOpen ? '-rotate-45 top-2.5' : 'top-4'}`}
            />
          </button>
        )}
        <nav className='flex gap-4 text-lg font-semibold'>
          {navigtions.map((nav) => (
            <NavLink
              key={nav.to}
              to={nav.to}
              className={({ isActive }) =>
                `transition-all ease-in-out duration-300 ${isActive ? 'text-gray-950/60' : undefined}`
              }
            >
              {nav.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default LayoutHeader