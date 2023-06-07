import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Lobby from './pages/Lobby';

function App() {
    return (
        <React.Fragment>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/lobby' element={<Lobby />} />
            </Routes>
        </React.Fragment>
    )
}

export default App
