'use client';

import { useState } from 'react';

import Draw from '@/components/drawtools/Draw.jsx';
import LobbyGenerator from '@/components/LobbyGenerator';

import { useGlobalContext } from '@/contexts/GlobalStore';

export default function QuickDraw() {
    const [lobbyCode, setLobbyCode] = useState();

    const globalState = useGlobalContext();

    console.log("globalState", globalState);

    return (<>
        <LobbyGenerator onCodeGenerated={setLobbyCode} />
        { lobbyCode && <Draw lobbyCode={lobbyCode} userId={123} displayName={'Test'} /> }
    </>);
}