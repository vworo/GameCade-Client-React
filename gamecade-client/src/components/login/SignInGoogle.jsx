import { useEffect } from 'react';
import { signInWithPopup, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase.js';
import '../login/SignInGoogle.css'

export default function SignInGoogle() {
    const provider = new GoogleAuthProvider();
    const router = useRouter();

    // ** Will throw user straight to /lobby on page refresh
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('User signed in:', user);
                router.push('/lobby');
            }
        });

        return () => unsubscribe();
    }, []);

    const _signInWithGoogle = async () => {
        try {
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.error('Error signing in', error);
        };
    };

    return (
        <button 
            className="py-2 px-4" 
            onClick={ _signInWithGoogle }
        >SIGN IN WITH GOOGLE</button>
    );
};