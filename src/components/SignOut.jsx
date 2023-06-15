import { useLocation, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import '../components/SignOut.css'

export default function SignOut() {
    const navigate = useNavigate();

    const _handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Error signing out', error);
        }
    };

    return (
        auth.currentUser && (
            <button onClick={_handleSignOut}>SIGN OUT</button>
        )
    );
};