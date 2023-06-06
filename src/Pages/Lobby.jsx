import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import ChatBox from '../components/ChatBox';

export default function Lobby(props) {
    return (
        <div>
            <h1>GAMECADE</h1>
            <ChatBox />
            <Outlet />
        </div>
    )
}