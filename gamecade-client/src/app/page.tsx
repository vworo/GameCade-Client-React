'use client'

import SignInGoogle from '../components/login/SignInGoogle';

export default function Login() {
    return (
        <div className="flex flex-1 flex-col align-center justify-center text-center items-center h-full">
            <h1 className="text-9xl italic font-bold mb-4">GAMECADE</h1>
            <p className="mb-2">🎮 <strong>Welcome to Gamecade:</strong> Play, earn credits, and unlock a world of rewards. <br />
                Our online arcade offers thrilling games crafted by talented developers.
            </p>
            <p className="mb-8">
                Join a vibrant community, customize your experience, and level up your gaming journey. <br />
                Ready to play, earn, and thrive? Join Gamecade now!</p>
            <SignInGoogle />
            {/* <SignInAnon /> */}
        </div>
    );
}