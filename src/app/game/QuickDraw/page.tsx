'use client';

import { useState } from 'react';

import Draw from '@/components/drawtools/Draw.jsx';
import LobbyGenerator from '@/components/LobbyGenerator';

export default function QuickDraw() {
    const [lobbyCode, setLobbyCode] = useState();
    return (<>
        <LobbyGenerator onCodeGenerated={setLobbyCode} />
        { lobbyCode && <Draw lobbyCode={lobbyCode} userId={123} displayName={'Test'} /> }
    </>);
}