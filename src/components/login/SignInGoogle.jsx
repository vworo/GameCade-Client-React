import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.js';

export default function SignInGoogle() {
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();

    const _signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
            navigate('/lobby');
        } catch (error) {
            console.error('Error signing in', error);
        };
    };

    return (
        <button onClick={_signInWithGoogle}>Sign in with Google</button>
    );
};