import { signInAnonymously } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.js';

export default function SignInAnon() {
    const navigate = useNavigate();

    const _signInAnonymously = async () => {
        try {
            await signInAnonymously(auth);
            navigate('/lobby');
        } catch (error) {
            console.error('Error signing in anonymously', error);
        };
    }

    return (
        <button onClick={_signInAnonymously}>Sign in anonymously</button>
    );
};