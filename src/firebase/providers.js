import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { FirebaseAuth } from "./config"


export const registerUserWithEmailAndPassword = async({ displayName, email, password }) => {

    try { 

        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid } = resp.user;
        await updateProfile( FirebaseAuth.currentUser, { displayName } )
        return {
            ok: true,
            uid, displayName, email
        }

    } catch (error) {

        console.log('error original: ' + error.code)

        let errorModified = ''
        if (error.code === 'auth/email-already-in-use'){
            errorModified = 'Este email ya está en uso'
        }
        return {
            ok: false,
            errorMessage: errorModified
        }

    }
}

export const loginWithEmailAndPassword = async({ email, password }) => {

    try {
        
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid } = resp.user
        const { displayName } = resp.user
        return {
            ok: true,
            uid, displayName, email
        }

    } catch (error) {
        
        console.log('error original: ' + error.code)

        let errorModified = ''
        if (error.code === 'auth/wrong-password'){
            errorModified = 'La contraseña es inválida'
        } else if (error.code === 'auth/user-not-found') {
            errorModified = 'Este usuario no existe'
        } else if (error.code === 'auth/invalid-email') {
            errorModified = 'Digite un email válido'
        }
        return {
            ok: false,
            errorMessage: errorModified
        }

    }

}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut()
}