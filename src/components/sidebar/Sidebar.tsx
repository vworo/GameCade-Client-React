import Link from 'next/link'

import SignOut from "@/components/SignOut"
import { useGlobalContext } from '@/contexts/GlobalStore';


export default function Sidebar({}) {
    const globalStore = useGlobalContext();

    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white w-1/5 p-4 fixed border border-yellow-500 justify-between">
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
                    <SignOut />
                </div>
            </nav>  
        </aside>
    )
}