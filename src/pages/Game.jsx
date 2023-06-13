import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js';

import ChatBox from '../components/ChatBox.jsx';
import Games from '../components/games/Games.jsx';

export default function Game() {
    const { lobbyCode } = useParams();
    const [players, setPlayers] = useState([]);

    const { state } = useLocation();
    const { displayName, userId } = state;
    console.log({ displayName, userId });

    useEffect(() => {
        // Create reference for the specified lobby in the 'lobbies' collection
        const lobbyRef = doc(db, 'lobbies', lobbyCode);

        // Setup a listener for changes in the document - https://firebase.google.com/docs/firestore/query-data/listen
        const unsubscribe = onSnapshot(lobbyRef, (snapshot) => {
            const lobbyData = snapshot.data();

            // Use map to extract player names  from the 'players' array, storing them in a new array to parsed into the 'players' useState
            const updatedPlayers = lobbyData.players.map(player => player.name);
            setPlayers(updatedPlayers);
        });

        // Clean up the listener when the component is unmounted
        return () => unsubscribe();
    }, []);

    if (userId && displayName) {
        return (
            <div>
                <h1>Game Lobby: {lobbyCode}</h1>
                <h2>Players:</h2>
                <ul>
                    {players.map((player, index) => (
                        <li key={index}>{player}</li>
                    ))}
                </ul>
        
                <Games lobbyCode={lobbyCode} displayName={displayName} userId={userId} />
                <ChatBox />
            </div>
          );
    } else {
        <div>Not logged in.</div>
    };
};
