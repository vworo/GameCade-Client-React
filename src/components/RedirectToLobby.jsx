import { useNavigate } from "react-router-dom"
import { auth } from '../firebase.js';

export default function RedirectToLobby() {
    const navigate = useNavigate();

    const _handleRedirect = () => {
        navigate('/lobby');
    }

    return (
        auth.currentUser && (
            <button onClick={_handleRedirect}>MATCHMAKING</button>
        )
    )
}