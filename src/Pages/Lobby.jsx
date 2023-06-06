import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'

export default function Lobby(props) {
    return (
        <div>
            <h1>GAMECADE</h1>
            
            <Outlet />
        </div>
    )
}