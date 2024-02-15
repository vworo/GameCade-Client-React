'use client'

import SignInGoogle from '../components/login/SignInGoogle';

import SignOut from '../components/SignOut';
import RedirectToLobby from '../components/RedirectToLobby';

export default function Login() {
    return (
        <div className="loginContainer">
            <SignOut />
            <RedirectToLobby />

            <div className="landingContent">
                <h1>GAMECADE</h1>
                <SignInGoogle />
                {/* <SignInAnon /> */}
            </div>
        </div>
    );
}