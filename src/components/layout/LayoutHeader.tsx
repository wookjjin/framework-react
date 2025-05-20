import React from 'react'
import { NavLink } from 'react-router'

const navigtions = [
  { to: '/', name: 'Home' },
  { to: '/about', name: 'About' },
]

const LayoutHeader: React.FC = () => {
  return (
    <header
      className='sticky top-0 flex items-center px-4 py-3 h-16
      bg-gray-50/90 ring-1 ring-gray-900/10 backdrop-blur-sm'
    >
      <nav className='flex justify-between gap-4 text-lg font-semibold'>
        {navigtions.map((nav) => (
          <NavLink
            key={nav.to}
            to={nav.to}
            className={({ isActive }) =>
              `transition-all ease-in-out duration-300  ${isActive ? 'text-gray-950/60' : undefined}`
            }
          >
            {nav.name}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default LayoutHeader
