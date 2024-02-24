import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase.js';
import '../login/SignInGoogle.css'

export default function SignInGoogle({ onSignInSuccess }) {
    const provider = new GoogleAuthProvider();
    const router = useRouter();

    const _signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            onSignInSuccess({ user: result.user });
            router.push('/dashboard');
        } catch (error) {
            console.error('Error signing in', error);
        };
    };

    return (
        <button 
            className="primary mx-1"
            onClick={ _signInWithGoogle }
        >SIGN IN WITH GOOGLE</button>
    );
};