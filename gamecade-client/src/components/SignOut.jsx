'use client'

import { useRouter } from 'next/navigation';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import '../components/SignOut.css'

export default function SignOut() {
    const router = useRouter();

    const _handleSignOut = async () => {
        try {
            await signOut(auth);
            router.push('/');
        } catch (error) {
            console.error('Error signing out', error);
        }
    };

    return (
        auth.currentUser && <button onClick={_handleSignOut}>SIGN OUT</button>
    );
};