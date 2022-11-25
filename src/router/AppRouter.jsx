import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useContext, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import AuthContext from '../context/auth/authContext'
import { HomePage } from '../pages/HomePage'
import { ServicesRoutes } from '../services/routes/ServicesRoute'

export const AppRouter = () => {

  const { state, Login, Logout } = useContext(AuthContext)

  useEffect(() => {

    const auth = getAuth();
    onAuthStateChanged( auth, async ( user ) => {
      if (!user) {
        Logout(null)
      }
      if (user) {
        Login(user)
      }
    })
  
  }, [])
  


  return (
    <Routes>

      {
        state.status === 'authenticated'
        ?
        <>
        <Route path='/*' element={ <ServicesRoutes /> }/>
        </>
        :
        <>
        <Route path='/auth/*' element={ <AuthRoutes /> }/>
        <Route path='/home' element={ <HomePage /> }/>
        </>
      }

      <Route path='/*' element={ <Navigate to='/home'/> }/>

    </Routes>
  )
}
