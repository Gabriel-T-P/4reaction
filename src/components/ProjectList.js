import { Link } from 'react-router-dom'
import Avatar from './Avatar'

// Styles
import './ProjectList.css'

export default function ProjectList({ projects }) {

  return (
    <div className='project-list'>
      {projects.lenght === 0 && <p>Por enquanto sem projetos</p>}
      {projects.map((project) => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <p>Previsto para {project.dueDate.toDate().toDateString()} </p>
          <div className="assigned-to">
            <ul>
              {project.assignedUsersList.map((user) => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  )
}
