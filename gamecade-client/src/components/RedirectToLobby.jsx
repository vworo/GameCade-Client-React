import { useRouter } from 'next/navigation';
import { auth } from '../firebase.js';

export default function RedirectToLobby() {
    const router = useRouter()

    const _handleRedirect = () => {
        router.push('/lobby');
    }

    return (
        auth.currentUser && (
            <button onClick={_handleRedirect}>MATCHMAKING</button>
        )
    )
}