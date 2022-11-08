import { Link } from 'react-router-dom'
import Avatar from './Avatar'

// Styles
import './ProjectList.css'

export default function ProjectList({ documents }) {

  return (
    <div className='project-list'>
      {documents.lenght === 0 && <p>Por enquanto sem reações.</p>}
      {documents.map((reaction) => (
        <Link to={`/reactionDetails/${reaction.id}`} key={reaction.id}>
          <h4>{reaction.name}</h4>
          <div className="assigned-to">
            <ul>
              <li>
                <p>De: </p>
                <Avatar src={reaction.createdBy.photoURL} />
                <p>{reaction.createdBy.displayName}</p>
              </li>
              <li>
                <p>Para: </p>
                <Avatar src={reaction.assignedUserList.photoURL} />
                <p>{reaction.assignedUserList.displayName}</p>
              </li>
            </ul>
          </div>
        </Link>
      ))}
    </div>
  )
}
