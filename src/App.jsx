import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import Login from './pages/Login';
// import Lobby from './pages/Lobby';
// import Game from './pages/Game';
import SignOut from './components/SignOut';
import RedirectToLobby from './components/RedirectToLobby';
import './App.css'

function App() {
    return (
        <React.Fragment>
            <SignOut />
            <RedirectToLobby />
            <Routes>
                {/* <Route path='/' element={<Login />} /> */}
                {/* <Route path='/lobby' element={<Lobby />} />
                <Route path='/lobby/:lobbyCode' element={<Game />} /> */}
            </Routes>
        </React.Fragment>
    )
}

export default App;
