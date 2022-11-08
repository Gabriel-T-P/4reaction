import { useCollection } from '../../hooks/useCollection'
import { useState } from "react"

// Components
import Avatar from '../../components/Avatar'
import ProjectFilter from './ProjectFilter'

// Styles
import './Dashboard.css'

export default function Dashboard() {
  const { documents, error } = useCollection('users')
  const [currentFilter, setCurrentFilter] = useState('todos')

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const users = documents ? documents.filter((document) => {
    switch (currentFilter) {
      case 'todos':
        return true

      case 'financeiro':
      case 'logistica':
      case 'suprimentos':
      case 'materiais':
      case 'carga':
        return document.department.value === currentFilter

      default:
        return true
    }
  }) : null

  return (
    <div>
      <h2 className="page-title">Projetos criados</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectFilter changeFilter={changeFilter} currentFilter={currentFilter} />}

      <div className='users-list'>
        {users && users.map((user) => (
          <div key={user.registration}>
            <div className="assigned-to">
              <ul>
                <li>
                  <Avatar src={user.photoURL} />
                  <p>{user.displayName} {user.lastName}</p>
                  <span> - {user.counter} reações</span>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
