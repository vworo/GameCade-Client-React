'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '../../firebase.js';

import ChatBox from '../../components/ChatBox.jsx';
import './Lobby.css';

export default function Lobby() {
    const router = useRouter();
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
                    players: [{ name: displayName, id: userId, drawingStatus: "IN_PROGRESS" }],
                    timestamp: new Date()
                });

                // Redirect to the lobby page with the generated lobby code, passing data to next route
                router.push(`/lobby/${lobbyCode}`, { state: { displayName, userId } });
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
                        players: arrayUnion({ name: displayName, id: userId, drawingStatus: "IN_PROGRESS" })
                    });

                    // Redirect to the lobby page with the join code, passing data to next route
                    router.push(`/lobby/${joinCode}`, { state: { displayName, userId } });
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
            <div className='lobby-content'>
                <h1>GAMECADE LOBBY</h1>
                <div className='create-lobby-button'>
                    <button onClick={_handleCreateLobby}>CREATE LOBBY</button>
                </div>
                <h2>OR</h2>
                <form onSubmit={_handleJoinLobby}>
                    <input onChange={e => setJoinCode(e.target.value)} />
                    <div className="button-container">
                        <button type="submit">JOIN LOBBY</button>
                    </div>
                    {errorMessage && <p>{errorMessage}</p>}
                </form>
            </div>
            <ChatBox />
        </div>
    );
};