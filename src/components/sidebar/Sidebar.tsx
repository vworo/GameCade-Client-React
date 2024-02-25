'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link'

import SignOut from "@/components/SignOut"
import { useGlobalContext, EMPTY_USER } from '@/contexts/GlobalStore';

import './Sidebar.scss';

export default function Sidebar({}) {
    const router = useRouter();
    const globalStore = useGlobalContext();

    const handleSignOut = () => {
        globalStore?.setUser(EMPTY_USER);

        // * Push custom route
        router.push("/");
    }

    return (
        <aside className="h-svh w-1/4 gc-sidebar flex flex-col p-4 justify-between">
            <nav className="flex-col flex justify-center items-center">
                <h1 className="gc-logo text-white italic font-bold text-4xl mb-12">GAMECADE</h1>

                <button className="primary w-full mb-4">
                    Play Games
                </button>

                <Link href="/games/QuickDraw" className="w-full mb-4">
                    <button className="secondary w-full">
                        (TEST) QuickDraw)
                    </button>
                </Link>
            </nav>

            <div className="flex justify-center">
                { globalStore.user && 
                    <span className="text-blue-400">{ globalStore.user.displayName }</span>
                }
                <SignOut onSignOutComplete={handleSignOut}/>
            </div>
        </aside>
    )
}