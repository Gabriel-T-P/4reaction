import Avatar from '../../components/Avatar'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

export default function ProjectSummary({ reaction }) {
  const { deleteDocument } = useFirestore('projects')
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const handleClick = (e) => {
    if (user.uid === reaction.createdBy.id) {
      deleteDocument(reaction.id)
      navigate('/')

    }
    else {
      alert('Somente quem criou a reação pode deletar.')
    }

  }

  return (

    <div>
      <div className="project-summary">
        <h2 className="page-title"> {reaction.name} </h2>
        <p>Categoria: {reaction.category}</p>
        <p className="details">
          {reaction.details}
        </p>
        <h4>Dono da reação:</h4>
        <div className="assigned-users">
          <Avatar src={reaction.createdBy.photoURL} />
          <p> {reaction.createdBy.displayName} </p>
        </div>
      </div>
      <button className="btn" onClick={handleClick}>Excluir reação</button>
    </div>
  )
}
