import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

// Styles
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isPending, error } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (

    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Entrar</h2>

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

      {!isPending && <button className="btn">Entrar</button>}
      {isPending && <button className="btn" disabled>Carregando...</button>}
      {error && <div className="error"> {error} </div>}

    </form>
  )
}
