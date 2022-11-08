import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'

// Styles
import './Project.css'
import ProjectComments from './ProjectComments'
import ProjectSummary from './ProjectSummary'

export default function Project() {
  const { id } = useParams()
  const { error, document } = useDocument('reactions', id)

  if (error) {
    return (<div className="error"> {error} </div>)
  }

  if (!document) {
    return (<div className="loading">Carregando.....</div>)
  }

  return (

    <div className='project-details'>
      <ProjectSummary reaction={document} />
      <ProjectComments reaction={document} />
    </div>
  )
}
