
const AuthReducer = (state, action) => {
    const { payload, type } = action;

    //funciones
    if (type === 'LOGIN') {
        return {
            ...state,
            status: 'authenticated',
            uid: payload.uid,
            displayName: payload.displayName,
            email: payload.email,
            errorMessage: null
            }
    } else if ( type === 'LOGOUT' ) {
        return {
            ...state,
            status: 'not-authenticated',
            uid: null,
            displayName: null,
            email: null,
            errorMessage: payload
        }
    }
    
}

export default AuthReducer