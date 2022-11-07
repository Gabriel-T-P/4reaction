import Avatar from '../../components/Avatar'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

export default function ProjectSummary({ project }) {
  const { deleteDocument } = useFirestore('projects')
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const handleClick = (e) => {
    if (user.uid === project.createdBy.id) {
      deleteDocument(project.id)
      navigate('/')

    }
    else {
      alert('Somente o dono do projeto pode utilizar esse botão')
    }

  }

  return (

    <div>
      <div className="project-summary">
        <h2 className="page-title"> {project.name} </h2>
        <p>Criado por {project.createdBy.displayName}</p>
        <p className="due-date">
          Previsão de finalização do projeto: {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">
          {project.details}
        </p>
        <p> {project.category} </p>
        <h4>Participantes do projeto:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      <button className="btn" onClick={handleClick}>Finalizar Projeto</button>
    </div>
  )
}
