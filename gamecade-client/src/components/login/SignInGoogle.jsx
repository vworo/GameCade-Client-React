import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase.js';
import '../login/SignInGoogle.css'

export default function SignInGoogle() {
    const provider = new GoogleAuthProvider();
    const router = useRouter();

    const _signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
            router.push('/lobby');
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