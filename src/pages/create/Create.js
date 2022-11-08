import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'
import { projectFirestore } from '../../firebase/config'

// Styles
import './Create.css'

const categories = [
  { value: 'criativo', label: 'Criativo' },
  { value: 'empenhado', label: 'Empenhado' },
  { value: 'organizado', label: 'Organizado' },
  { value: 'grandeAjuda', label: 'Grande ajuda' },
  { value: 'gostei', label: 'Gostei do trabalho' }
]

export default function Create() {
  const { addDocument, response } = useFirestore('reactions')
  const { documents } = useCollection('users')
  const { user } = useAuthContext()
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  // Valores no form
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUser, setAssignedUser] = useState({})
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName }
      })
      setUsers(options)
    }
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!category) {
      setFormError('Por favor, escolha uma categoria')
      return
    }

    if (assignedUser.length < 1) {
      setFormError('Por favor, selecione 1 participante para a reação.')
      return
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const assignedUserList = {
      displayName: assignedUser.value.displayName,
      photoURL: assignedUser.value.photoURL,
      id: assignedUser.value.id
    }

    const reaction = {
      name,
      details,
      category,
      comments: [],
      createdBy,
      assignedUserList
    }

    const addCounter = async (id) => {
      const ref = projectFirestore.collection('users')
      const updateCounter = await ref.doc(id).update({
        counter: assignedUser.value.counter + 1
      })
      return updateCounter
    }

    setFormError(null)
    await addDocument(reaction)
    await addCounter(assignedUser.value.id)
    if (!response.error) {
      navigate('/')
    }
  }

  return (
    <form className='create-form' onSubmit={handleSubmit}>
      <h2 className='page-title'>Mande uma reação para alguém!</h2>

      <label>
        <span>Título da reação:</span>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </label>

      <label>
        <span>Detalhes da reação:</span>
        <textarea
          onChange={(e) => setDetails(e.target.value)}
          value={details}
          required
        ></textarea>
      </label>

      <label>
        <span>Categoria da reação:</span>
        <Select
          onChange={(option) => setCategory(option)}
          options={categories}
        />
      </label>

      <label>
        <span>Destinatário da reação:</span>
        <Select
          onChange={(option) => setAssignedUser(option)}
          options={users}
        />
      </label>

      <button className="btn">Enviar reação</button>

      {formError && <p className="error"> {formError} </p>}

    </form>
  )
}
