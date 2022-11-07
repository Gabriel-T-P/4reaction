import { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'

// Components
import ProjectList from '../../components/ProjectList'

// Styles
import './Reactions.css'

export default function Reactions() {
  const { documents, error } = useCollection('reactions')
  const [currentFilter, setCurrentFilter] = useState('meus')
  const { user } = useAuthContext()

  const reactions = documents ? documents.filter((document) => {

    switch (currentFilter) {
      case 'todos':
        return true

      case 'meus':
        let assignedToMe = false
        if (document.assignedUserList.id === user.uid) {
          assignedToMe = true
        }
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
      <h2 className="page-title">Reações recebidas</h2>
      {error && <p className="error">{error}</p>}
      {reactions && <ProjectList documents={reactions} />}
    </div>
  )
}
