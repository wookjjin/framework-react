import { NavLink } from 'react-router'

const navigtions = [
  { to: '/', name: 'Home' },
  { to: '/about', name: 'About' },
]

export function LayoutHeader() {
  return (
    <header>
      <nav>
        {navigtions.map(nav => (
          <NavLink
            key={nav.to}
            to={nav.to}>
            {nav.name}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default LayoutHeader
