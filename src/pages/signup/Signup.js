import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import Select from 'react-select'

// Styles
import './Signup.css'

// Categorias para o select
const categoriesDepartment = [
  { value: 'financeiro', label: 'Financeiro' },
  { value: 'logistica', label: 'Logistica' },
  { value: 'suprimentos', label: 'Suprimentos' },
  { value: 'materiais', label: 'Materiais' },
  { value: 'carga', label: 'Carga' }
]
const categoriesOffice = [
  { value: 'analista', label: 'Analista' },
  { value: 'transportador', label: 'Transportador' },
  { value: 'planejador', label: 'Planejador' },
  { value: 'operador', label: 'Operador' },
  { value: 'almoxarife', label: 'Almoxarife' },
  { value: 'manutenção', label: 'Manutenção' }
]

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [lastName, setLastName] = useState('')
  const [department, setDepartment] = useState('')
  const [office, setOffice] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const [formError, setFormError] = useState(null)
  const { signup, isPending, error } = useSignup()


  const handleSubmit = (e) => {
    e.preventDefault()

    if (!department || !office) {
      setFormError('Por favor, escolha uma categoria')
      return
    }

    signup(email, password, displayName, lastName, department, office, thumbnail)
    setFormError(null)
  }

  const handleFileChange = (e) => {
    setThumbnail(null)
    let selected = e.target.files[0]

    if (!selected || (!selected.type.includes('image'))) {
      setThumbnailError('Selecione um arquivo de imagem')
      return
    }

    if (selected.size > 100000) {
      setThumbnailError('Arquivo de imagem deve ser menor que 100kb')
      return
    }

    setThumbnailError(null)
    setThumbnail(selected)

    console.log('Imagem do perfil atualizada')
  }

  return (

    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Cadastrar</h2>

      <label>
        <span>nome do usuário:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          required
        />
      </label>

      <label>
        <span>sobrenome do usuário:</span>
        <input
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          required
        />
      </label>

      <label>
        <span>Departamento:</span>
        <Select
          onChange={(option) => setDepartment(option)}
          options={categoriesDepartment}
        />
      </label>

      <label>
        <span>Cargo:</span>
        <Select
          onChange={(option) => setOffice(option)}
          options={categoriesOffice}
        />
      </label>

      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>

      <label>
        <span>senha:</span>
        <input
          type="current-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>

      <label>
        <span>imagem do perfil:</span>
        <input
          type="file"
          onChange={handleFileChange}
          required
        />
        {thumbnailError && <div className='error'> {thumbnailError} </div>}
      </label>

      {!isPending && <button className="btn">Concluir</button>}
      {isPending && <button className="btn" disabled>Carregando...</button>}
      {error && <div className="error"> {error} </div>}

      {formError && <p className="error"> {formError} </p>}

    </form>
  )
}
