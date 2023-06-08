import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom'

import ChatBox from '../components/ChatBox';
import Games from '../components/games/Games';
import '../pages/Lobby.css'

export default function Lobby() {
    return (
        <div>
            <h1>GAMECADE</h1>
            <div>
                <Games />
                <ChatBox />
            </div>
        </div>
    )
}