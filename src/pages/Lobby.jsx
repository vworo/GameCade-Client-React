import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import ChatBox from '../components/ChatBox';
import Games from '../components/games/Games';
import { useLocation, useOutletContext } from 'react-router-dom';
import '../pages/Lobby.css'

export default function Lobby() {
    const { state } = useLocation();

    useEffect(() => {
        console.log(state);


    }, [state])
    return (
        <div>
            <h1>GAMECADE</h1>
            <div>
                <Outlet />
                <Games />
                <ChatBox />
            </div>
        </div>
    )
}