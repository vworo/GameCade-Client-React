import { createContext, useState, useEffect, useContext } from 'react';
import { GoogleAuthProvider, signInWithRedirect, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase.js';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    }

    return (
        <AuthContext.Provider value={{ googleSignIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}