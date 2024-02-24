'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link'

import SignOut from "@/components/SignOut"
import { useGlobalContext, EMPTY_USER } from '@/contexts/GlobalStore';


export default function Sidebar({}) {
    const router = useRouter();
    const globalStore = useGlobalContext();

    const handleSignOut = () => {
        globalStore?.setUser(EMPTY_USER);

        // * Push custom route
        router.push("/");
    }

    return (
        <aside className="h-screen w-1/4">
            <nav className="h-full flex flex-col bg-white w-full p-4 border border-yellow-500 justify-between">
                <div className="flex-col flex justify-center items-center border border-blue-500">
                    <h1 className="text-black italic font-bold text-4xl mb-7">GAMECADE</h1>
                    <button className="primary">
                        Play Games
                    </button>

                    <Link href="/games/QuickDraw">
                        <button className="secondary">
                            (TEST) QuickDraw)
                        </button>
                    </Link>
                </div>

                <div className="flex justify-center border border-red-500">
                    { globalStore.user && 
                        <span className="text-blue-400">{ globalStore.user.displayName }</span>
                    }
                    <SignOut onSignOutComplete={handleSignOut}/>
                </div>
            </nav>  
        </aside>
    )
}