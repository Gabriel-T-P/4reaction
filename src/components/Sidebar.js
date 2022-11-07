import { NavLink } from 'react-router-dom'
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext'

// Styles & Images
import './Sidebar.css'
import AddIcon from '../assets/add_icon.svg'
import DashboardIcon from '../assets/dashboard_icon.svg'
import LikeIcon from '../assets/like.png'

export default function Sidebar() {
  const { user } = useAuthContext()

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Bem vindo {user.displayName}!</p>
        </div>

        <nav className="links">
          <ul>
            <li>
              <NavLink to='/'>
                <img src={DashboardIcon} alt="ícone do dashboard" />
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink to='/reactions'>
                <img src={LikeIcon} alt="ícone de minhas reações" />
                <span>Minhas Reações</span>
              </NavLink>
            </li>

            <li>
              <NavLink to='/create'>
                <img src={AddIcon} alt="ícone de adicionar reação" />
                <span>Nova Reação</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

    </div>
  )
}
