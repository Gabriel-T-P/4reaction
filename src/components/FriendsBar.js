import { useCollection } from '../hooks/useCollection'

// Components
import Avatar from './Avatar'

// Styles 
import './FriendsBar.css'

export default function FriendsBar() {
  const { error, documents } = useCollection('users')

  return (
    <div className='user-list'>
      <h2>Lista de usuários</h2>
      {error && <div className="error"> {error} </div>}
      {documents && documents.map(user => (
        <div key={user.id} className='user-list-item'>
          {user.online && <span className="online-user"></span>}
          <span>{user.displayName}</span>
          <Avatar src={user.photoURL} />
        </div>
      ))}
    </div>
  )
}
