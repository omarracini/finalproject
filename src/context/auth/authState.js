import { useId, useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

const AuthState = ({ children }) => {

    const inicialState = {
        status: 'not-authenticated',
        uid: null,
        displayName: null,
        email: null,
        errorMessage: null
    }

    const [state, dispatch] = useReducer(AuthReducer, inicialState)

    // metodos
    const Login = (value) => {
        dispatch({
            payload: value,
            type: 'LOGIN'
        })
    }

    const Logout = (value) => {
        dispatch({
            payload: value,
            type: 'LOGOUT'
        })
    }

    const value = {
        state,
        Login,
        Logout
    }

    return (
        <AuthContext.Provider value={ value }>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthState

