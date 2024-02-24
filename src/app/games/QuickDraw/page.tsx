'use client';

import { useState } from 'react';

import Draw from '@/components/drawtools/Draw.jsx';
import LobbyGenerator from '@/components/LobbyGenerator';

import { useGlobalContext } from '@/contexts/GlobalStore';

export default function QuickDraw() {
    const globalState = useGlobalContext();
    const [lobbyCode, setLobbyCode] = useState();

    return (<>
        <LobbyGenerator onCodeGenerated={setLobbyCode} />
        { lobbyCode && <Draw lobbyCode={lobbyCode} userId={globalState.user.id} displayName={globalState.user.displayName} /> }
    </>);
}