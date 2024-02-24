'use client'

import { useRouter } from 'next/navigation';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import '../components/SignOut.css'

export default function SignOut({ onSignOutComplete }) {
    const router = useRouter();

    const _handleSignOut = async () => {
        try {
            await signOut(auth);
            onSignOutComplete();
        } catch (error) {
            console.error('Error signing out', error);
        }
    };

    return (
        <button className='primary' onClick={_handleSignOut}>Sign Out</button>
    );
};