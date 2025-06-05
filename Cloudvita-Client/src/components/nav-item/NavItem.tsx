import { Link, LinkProps, useMatch } from 'react-router-dom'
import { sidebarIcons } from '~/utils/icons'

interface NavItemProps extends LinkProps {
  to: string
  icon: keyof typeof sidebarIcons
  children: React.ReactNode
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, children, ...props }) => {
  const match = useMatch(to)
  return (
    <li className="navbar__item">
      <Link
        to={to}
        {...props}
        className={`navbar__li ${match ? 'navbar__li--active' : ''}`}
      >
        {sidebarIcons[icon]}
        <span className="navbar__link">{children}</span>
      </Link>
    </li>
  )
}

export default NavItem
