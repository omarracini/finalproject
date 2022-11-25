import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import { loginWithEmailAndPassword } from '../../firebase/providers'

export const LoginPage = () => {

  const { state, Login, Logout } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onEmailChange = (e) => {
    setEmail( e.target.value )
  }

  const onPasswordChange = (e) => {
    setPassword( e.target.value )
  }

  const onSubmit = (e) => {
    e.preventDefault()
    

    const asyncFuncion = async() => {
      const resp = await loginWithEmailAndPassword({ email, password })
      if (!resp.ok) {
        Logout(resp.errorMessage)
      }
      if (resp.ok) {
        Login(resp)
      }
    }

    asyncFuncion()

  }
   
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <form onSubmit={ onSubmit } className="form col-4 mt-5 animate__animated animate__fadeInRightBig">
          <h1 className="display-5 text-center">Ingreso</h1>
          <input onChange={ onEmailChange } className="form-control mb-2" type="text" placeholder="Email" />
          <input onChange={ onPasswordChange } className="form-control mb-2" type="password" placeholder="Contraseña" />
          {
            !!state.errorMessage?
            <p className="mb-2 text-danger">{state.errorMessage}</p>
            :
            ''
          }
          <input value="Ingresar" type="submit" className="btn btn-dark form-control mb-2" />
          <Link to="/auth/register"><button type="button" className="btn btn-outline-dark form-control">¿No está registrado?</button></Link>
        </form>
      </div>
    </div>
  )
}
