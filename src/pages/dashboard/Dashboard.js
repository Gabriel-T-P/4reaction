import { useCollection } from '../../hooks/useCollection'
import { useState } from "react"
import { useAuthContext } from '../../hooks/useAuthContext'

// Components
import ProjectList from '../../components/ProjectList'
import ProjectFilter from './ProjectFilter'

// Styles
import './Dashboard.css'

export default function Dashboard() {
  const { documents, error } = useCollection('projects')
  const [currentFilter, setCurrentFilter] = useState('todos')
  const { user } = useAuthContext()

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const projects = documents ? documents.filter((document) => {
    switch (currentFilter) {
      case 'todos':
        return true

      case 'meus':
        let assignedToMe = false
        document.assignedUsersList.forEach((u) => {
          if (u.id === user.uid) {
            assignedToMe = true
          }
        })
        return assignedToMe

      case 'design':
      case 'desenvolvimento':
      case 'marketing':
      case 'vendas':
        return document.category === currentFilter

      default:
        return true
    }
  }) : null

  return (
    <div>
      <h2 className="page-title">Projetos criados</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectFilter changeFilter={changeFilter} currentFilter={currentFilter} />}
      {projects && <ProjectList projects={projects} />}
    </div>
  )
}
