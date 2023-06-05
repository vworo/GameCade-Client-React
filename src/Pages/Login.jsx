import React, { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [redirectToLobby, setRedirectToLobby] = useState(false);

  const handlePlayClick = () => {
    // Save the username
    // Here, you can perform any necessary validation or processing on the username
    // For simplicity, we'll assume the username is valid

    // Redirect to the lobby by updating the state variable
    setRedirectToLobby(true);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  if (redirectToLobby) {
    // Render the lobby component or redirect using React Router
    // For simplicity, we'll just render a placeholder message here
    return <div>Redirecting to Lobby...</div>;
  }

  return (
    <div>
      <h1>GAMECADE</h1>
      Username:
      <input type="text" placeholder="JoelIsDaGoat" value={username} onChange={handleUsernameChange} />
      <button onClick={handlePlayClick}> PLAY </button>
    </div>
  );
}
