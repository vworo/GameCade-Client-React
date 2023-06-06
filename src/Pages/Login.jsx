import React, { useState } from 'react';
import { Link, useLocation, useOutletContext } from 'react-router-dom'
import '../Pages/Login.css';

export default function Login() {
    const [username, setUsername] = useState('');

    let { state } = useLocation();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    return (
        <div className="loginContainer">
            <div className="landingContent">
                <h1>GAMECADE</h1>
                Username:
                <input type="text" placeholder="JoelsDaGoat" value={username} onChange={handleUsernameChange} required/>
                <Link to='/lobby' state={{ username, setUsername }}>
                    <button> PLAY </button>
                </Link>
            </div>
        </div>
    );
}
