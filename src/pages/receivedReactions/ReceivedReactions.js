import { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'

// Components
import ProjectList from '../../components/ProjectList'

// Styles
import './ReceivedReactions.css'

export default function ReceivedReactions() {
  const { documents, error } = useCollection('reactions')
  const [currentFilter, setCurrentFilter] = useState('meus')
  const { user } = useAuthContext()

  const reactions = documents ? documents.filter((document) => {

    switch (currentFilter) {
      case 'todos':
        return true

      case 'meus':
        let sentByMe = false
        if (document.createdBy.id === user.uid) {
          sentByMe = true
        }
        return sentByMe

      case 'design':
      case 'desenvolvimento':
      case 'marketing':
      case 'vendas':
        return document.category.value === currentFilter

      default:
        return true
    }
  }) : null

  return (
    <div>
      <h2 className="page-title">Reações enviadas</h2>
      {error && <p className="error">{error}</p>}
      {reactions && <ProjectList documents={reactions} />}
    </div>
  )
}
