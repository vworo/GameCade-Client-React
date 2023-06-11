import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '../firebase.js';

import ChatBox from '../components/ChatBox.jsx';
import Games from '../components/games/Games';
import '../pages/Lobby.css';

export default function Lobby() {
    const navigate = useNavigate();
    const [joinCode, setJoinCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const _handleCreateLobby = async () => {
        const currentUser = auth.currentUser;

        if (currentUser) {
            const userId = currentUser.uid;
            const displayName = currentUser.displayName;

            try {
                // Generate a unique lobby code
                const lobbyCode = generateLobbyCode();

                // Create a new lobby in Firestore
                const lobbyRef = doc(db, 'lobbies', lobbyCode);
                await setDoc(lobbyRef, {
                    hostId: userId,
                    players: [{ name: displayName, id: userId }],
                    timestamp: new Date()
                });

                // Redirect to the lobby page with the generated lobby code
                navigate(`/lobby/${lobbyCode}`);
            } catch (error) {
                console.error('Error creating lobby', error);
            }
        }
    };

    const _handleJoinLobby = async (e) => {
        e.preventDefault();
        
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userId = currentUser.uid;
            const displayName = currentUser.displayName;

            try {
                // Check if the lobby exists in Firestore
                const lobbyRef = doc(db, 'lobbies', joinCode);
                const lobbySnapshot = await getDoc(lobbyRef);

                if (lobbySnapshot.exists()) {
                    // If lobby exists, add the user to the lobby's players array
                    await updateDoc(lobbyRef, {
                        players: arrayUnion({ name: displayName, id: userId })
                    });

                    // Redirect to the lobby page with the join code
                    navigate(`/lobby/${joinCode}`);
                } else {
                    // If lobby does not exist
                    console.log('Invalid lobby code');
                    setErrorMessage('Invalid lobby code');
                };
            } catch (error) {
                console.error('Error joining lobby', error);
                setErrorMessage('Error joining lobby');
            };
        };
    };

    const generateLobbyCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const codeLength = 6; // 6 is good because idk
        let lobbyCode = '';
    
        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            lobbyCode += characters.charAt(randomIndex);
        }
    
        return lobbyCode;
    };

    return (
        <div>
            <h1>GAMECADE LOBBY</h1>
            <div>
                <button onClick={_handleCreateLobby}>Create Lobby</button>
                
                <form onSubmit={_handleJoinLobby}>
                    <input onChange={e => setJoinCode(e.target.value)} />
                    <button type="submit">Join Lobby</button>
                    {errorMessage && <p>{errorMessage}</p>}
                </form>

                <Games />
                <ChatBox />
            </div>
        </div>
    );
};
