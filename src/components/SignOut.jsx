import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';

export default function SignOut() {
    return (
        auth.currentUser && (
            <button onClick={() => signOut(auth)}>Sign Out</button>
        )
    );
};