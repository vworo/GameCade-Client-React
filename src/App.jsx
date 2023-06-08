import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Lobby from './pages/Lobby';
import Draw from './components/drawtools/Draw.jsx';
import SignOut from './components/SignOut';

function App() {
    return (
        <React.Fragment>
            <SignOut />
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/lobby' element={<Lobby />} />
                <Route path='/draw' element={<Draw />} />
            </Routes>
        </React.Fragment>
    )
}

export default App
