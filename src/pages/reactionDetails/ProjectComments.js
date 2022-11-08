import { useState } from "react"
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'

// Component
import Avatar from "../../components/Avatar"

export default function ProjectComments({ reaction }) {
  const { updateDocument, response } = useFirestore('reactions')
  const [newComment, setNewComment] = useState('')
  const { user } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      id: Math.random()
    }

    await updateDocument(reaction.id, {
      comments: [...reaction.comments, commentToAdd]
    })

    if (!response.error) {
      setNewComment('')
    }
  }

  return (

    <div className="project-comments" onSubmit={handleSubmit}>
      <h4>Comentários da reação</h4>

      <ul>
        {!reaction.comments.lenght > 0 && reaction.comments.map((comment) => (
          <li key={comment.id}>

            <div className="comment-author">
              <Avatar src={comment.photoURL} />
              <p> {comment.displayName} </p>
            </div>
            <div className="comment-content">
              <p>{comment.content}</p>
            </div>

          </li>
        ))}
      </ul>

      <form className="add-comment">
        <label>
          <span>Adicionar novo comentário:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>

        <button className="btn">Adicionar</button>
      </form>
    </div>
  )
}
