import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.js';
import '../login/SignInGoogle.css'

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
        <div className="googleSignIn">
            <button onClick={_signInWithGoogle}>SIGN IN WITH GOOGLE</button>
        </div>
    );
};