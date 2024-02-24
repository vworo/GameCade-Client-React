import { signInAnonymously } from 'firebase/auth';
import { auth } from '@/firebase';

export default function SignInGuest({ onSignInSuccess }) {
    const _signInGuest = async () => {
        try {
            const result = await signInAnonymously(auth);

            if (!result.user) {
                log.error('No anonymous user created - please try again');
            } else {
                onSignInSuccess({ user: result.user });
            }
        } catch (error) {
            console.error('Error signing in', error);
        };
    };

    return (
        <button 
            className="secondary mx-1"
            onClick={ _signInGuest }
        >Try as a guest</button>
    );
};