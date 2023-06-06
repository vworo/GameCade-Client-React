import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../Pages/Login.css';

export default function Login() {
    const [username, setUsername] = useState('');
    //   const [redirectToLobby, setRedirectToLobby] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    return (
        <div>
            <h1>GAMECADE</h1>
            Username:
            <input type="text" placeholder="JoelsDaGoat" value={username} onChange={handleUsernameChange} />
            <Link to='/lobby'>
                <button> PLAY </button>
            </Link>
        </div>
    );
}
