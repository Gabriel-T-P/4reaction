import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'

// Styles
import './Profile.css'

export default function Project() {
  const { id } = useParams()
  const { error, document } = useDocument('projects', id)

  if (error) {
    return (<div className="error"> {error} </div>)
  }

  if (!document) {
    return (<div className="loading">Carregando.....</div>)
  }

  return (

    <div className='project-details'>
      teste
    </div>
  )
}