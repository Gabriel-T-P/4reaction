import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { useCollection } from '../../hooks/useCollection'

// Styles
import './LoginM.css'

export default function LoginM() {
  const [registration, setRegistration] = useState('')
  const [password, setPassword] = useState('')
  const { login, isPending, error } = useLogin()
  const { documents } = useCollection('users')

  console.log('s')

  const email = documents && documents.forEach(user => {
    if (user.registration === registration) {
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    //login(email, password)
  }

  return (

    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Entrar com matrícula</h2>

      <label>
        <span>matrícula:</span>
        <input
          type="text"
          onChange={(e) => setRegistration(e.target.value)}
          value={registration}
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

      {!isPending && <button className="btn">Entrar</button>}
      {isPending && <button className="btn" disabled>Carregando...</button>}
      {error && <div className="error"> {error} </div>}

    </form>
  )
}
