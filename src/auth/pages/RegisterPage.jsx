import { useContext, useState } from 'react'
import AuthContext from '../../context/auth/authContext'
import { Link } from 'react-router-dom'
import { registerUserWithEmailAndPassword } from '../../firebase/providers'


export const RegisterPage = () => {

  const { state, Login, Logout } = useContext(AuthContext)

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({
    status: false,
    mensaje: ''
  })

  const onNameChange = (e) => {
    setDisplayName(e.target.value)
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (displayName.length <= 1) {
      setError({
        status: true,
        mensaje: 'Digite un nombre válido'
      })
      return
    } 

    if (!email.includes('@')) {
      setError({
        status: true,
        mensaje: 'El correo debe contener un @'
      })
      return
    } 

    if (password.length <= 6) {
      setError({
        status: true,
        mensaje: 'La contraseña debe tener más de 6 dígitos'
      })
      return
    }

    setError({
      status: false,
      mensaje: ''
    })

    const asyncFunction = async () => {
      const resp = await registerUserWithEmailAndPassword({ displayName, email, password })
      if (!resp.ok) {
        Logout(resp.errorMessage)
      }
      if (resp.ok) {
        Login(resp)
      }
      

    }
    asyncFunction()
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
      <form onSubmit={ onSubmit } className="form col-4 mt-5 animate__animated animate__fadeInLeftBig">
          <h1 className="display-5 text-center">Registro</h1>
          <input onChange={ onNameChange } className="form-control mb-2" type="text" placeholder="Nombre" />
          <input onChange={ onEmailChange } className="form-control mb-2" type="text" placeholder="Email" />
          <input onChange={ onPasswordChange } className="form-control mb-2" type="password" placeholder="Contraseña" />
          {
            error.status?
            <p className="mb-2 text-danger">{error.mensaje}</p>
            :
            ''
          }
          {
            !!state.errorMessage?
            <p className="mb-2 text-danger">{state.errorMessage}</p>
            :
            ''
          }
          <input value="Registrarme" type="submit" className="btn btn-dark form-control mb-2" />
          <Link to="/auth/login"><button type="button" className="btn btn-outline-dark form-control">¿Ya está registrado?</button></Link>
        </form>
      </div>
    </div>
)
}
