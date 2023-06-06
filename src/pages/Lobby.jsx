import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import ChatBox from '../components/ChatBox';
import {useLocation, useOutletContext } from 'react-router-dom';

export default function Lobby() {
    const { state } = useLocation();

    useEffect(() => {
    console.log(state);


    }, [state])
    return (
        <div>
            <h1>GAMECADE</h1>
            <ChatBox />
            <Outlet />
        </div>
    )
}