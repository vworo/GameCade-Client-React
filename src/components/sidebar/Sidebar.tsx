import SignOut from "../SignOut"

export default function Sidebar({}) {
    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white w-1/5 p-4 fixed border border-yellow-500 justify-between">
                <div className="flex-col flex justify-center items-center border border-blue-500">
                    <h1 className="text-black italic font-bold text-4xl mb-7">GAMECADE</h1>
                    <button className="primary">
                        Play Games
                    </button>
                </div>

                <div className="flex justify-center border border-red-500">
                    <SignOut />
                </div>
            </nav>  
        </aside>
    )
}