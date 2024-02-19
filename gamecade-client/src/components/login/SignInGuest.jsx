import { signInAnonymously } from 'firebase/auth';
import { useRouter } from 'next/navigation';

import { auth } from '../../firebase';

export default function SignInGuest() {
    const router = useRouter();

    const _signInGuest = async () => {
        try {
            const result = await signInAnonymously(auth);

            if (!result.user) {
                log.error('No anonymous user created - please try again');
            } else {
                console.log("Guest login successful!", { user: result.user });
                router.push("/dashboard");
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