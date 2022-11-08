import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import { useState } from 'react'

//Components
import Avatar from '../../components/Avatar'

export default function ProjectSummary({ reaction }) {
  const { deleteDocument } = useFirestore('reactions')
  const { updateDocument } = useFirestore('users')
  const { error, document } = useDocument('users', reaction.assignedUserList.id)
  const [isPending, setIsPending] = useState(false)
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const handleClick = async (e) => {
    if (user.uid === reaction.createdBy.id) {
      setIsPending(true)

      //subtrair o contador de reação
      await updateDocument(reaction.assignedUserList.id, {
        counter: document.counter - 1
      })

      deleteDocument(reaction.id)

      setIsPending(false)
      navigate('/')

    }
    else {
      setIsPending(false)
      alert('Somente quem criou a reação pode deletar.')
    }

  }

  return (

    <div>
      <div className="project-summary">
        <h2 className="page-title"> {reaction.name} </h2>
        <p>Categoria: {reaction.category.label}</p>
        <p className="details">
          {reaction.details}
        </p>
        <h4>Dono da reação:</h4>
        <div className="assigned-users">
          <Avatar src={reaction.createdBy.photoURL} />
          <p> {reaction.createdBy.displayName} </p>
        </div>
      </div>
      {!isPending && <button className="btn" onClick={handleClick}>Excluir reação</button>}
      {isPending && <button className="btn" disabled>Carregando...</button>}
    </div>
  )
}
