import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import app from '../firebase/firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();


    const signUpWithEmail = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginWithEmail = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    };
    
    const githubSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider)
    }


    const logOut = () => {
        return signOut(auth)
    };
    const updateUser = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
        })
    };

    

    const saveUser = (name, email, role) =>{
        const user = {name, email, role};
        fetch('https://phone-seller-server2.vercel.app/users', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
        })
        .catch(err => {})
    }
    
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);

            if(currentUser && currentUser.email){
                const loggedUser  = {
                    email: currentUser.email,
                };
                fetch('https://phone-seller-server2.vercel.app/jwt', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(loggedUser)
                })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem('accessToken', data.token)
                })
            }
            else{
                localStorage.removeItem('accessToken');
            }
        });

        return () =>  unsubscribe();
    }, [])
    
    const authInfo = {
        signUpWithEmail,
        updateUser,
        loginWithEmail,
        googleSignIn,
        githubSignIn,
        saveUser,
        logOut,
        loading,
        user
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;