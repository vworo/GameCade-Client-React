import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js';

import ChatBox from '../components/ChatBox.jsx';

export default function Game() {
  const { lobbyCode } = useParams();
  const [players, setPlayers] = useState([]);

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

  return (
    <div>
        <h1>Game Page coming soon</h1>
        <h2>Players:</h2>
        <ul>
            {players.map((player, index) => (
                <li key={index}>{player}</li>
            ))}
        </ul>
        <ChatBox />
    </div>
  );
}
