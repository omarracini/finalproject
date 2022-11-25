import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/auth/authContext'
import { logoutFirebase } from '../firebase/providers'

export const Navbar = ({ children }) => {

    const { state, Logout } = useContext(AuthContext)

    const onLogout = () => {
        const asyncFunction = async() => {
            await logoutFirebase()
            Logout(null)
        }
        asyncFunction()
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link active" aria-current="page"><h4 className='navbar-brand display-6'>Home</h4></Link>
                            </li>
                        </ul>
                        {
                            state.status === 'not-authenticated' 
                            ?
                            <Link to='/auth/login'>
                                <button className='btn btn-success'>Login</button>
                            </Link>
                            :
                            <Link to='/auth/login'>
                                <button onClick={ onLogout } className="btn btn-danger">LogOut</button>
                            </Link>
                        }
                    </div>
                </div>
            </nav>
            {children}
        </>
    )
}
