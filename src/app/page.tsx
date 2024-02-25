'use client'

import { useRouter } from 'next/navigation';

import { useGlobalContext } from '@/contexts/GlobalStore';

import SignInGoogle from '@/components/login/SignInGoogle';
import SignInGuest from '@/components/login/SignInGuest';

import './Login.scss';

type User = {
    uid: number;
    displayName: string;
}

type SetLoggedInUserParams = {
    user: User,
}

export default function Login() {
    const router = useRouter();
    const globalStore = useGlobalContext();

    const setLoggedInUser = ({ user }: SetLoggedInUserParams) => {
        globalStore?.setUser(user);

        // * Push custom route
        router.push("/dashboard");
    }

    return (
        <div className="flex flex-1 flex-col align-center justify-center text-center items-center h-full">
            <h1 className="gc-logo text-9xl italic font-bold mb-4">GAMECADE</h1>
            <p className="mb-2">🎮 <strong>Welcome to Gamecade:</strong> Play, earn credits, and unlock a world of rewards. <br />
                Our online arcade offers thrilling games crafted by talented developers.
            </p>
            <p className="mb-8">
                Join a vibrant community, customize your experience, and level up your gaming journey. <br />
                Ready to play, earn, and thrive? Join Gamecade now!</p>

            <div className="flex flex-row">
                <SignInGoogle onSignInSuccess={setLoggedInUser} />
                <SignInGuest onSignInSuccess={setLoggedInUser} />
            </div>
        </div>
    );
}