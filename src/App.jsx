import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Lobby from './pages/Lobby';
import Game from './pages/Game';
import SignOut from './components/SignOut';
import Canvas from './pages/Canvas';

function App() {
    return (
        <React.Fragment>
            <SignOut />
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/lobby' element={<Lobby />} />
                <Route path='/lobby/:lobbyCode' element={<Game />} />
                <Route path='/draw' element={<Canvas />} />
            </Routes>
        </React.Fragment>
    )
}

export default App;
