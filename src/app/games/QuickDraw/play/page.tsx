'use client';

import { useState } from 'react';

import Draw from '@/components/drawtools/Draw.jsx';
import LobbyGenerator from '@/components/LobbyGenerator';

import { useGlobalContext } from '@/contexts/GlobalStore';

export default function QuickDrawPlay() {
    const globalState = useGlobalContext();
    const [lobbyCode, setLobbyCode] = useState();

    return (<>
        <div className="pageHeader game p-4">
            <h1 className='text-2xl'>QuickDraw!</h1>
        </div>
        <LobbyGenerator onCodeGenerated={setLobbyCode} />
        { lobbyCode && <Draw lobbyCode={lobbyCode} userId={globalState.user.id} displayName={globalState.user.displayName} /> }
    </>);
}