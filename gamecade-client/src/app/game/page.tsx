import { useEffect, useState } from 'react';

import { withRouter } from 'next/router'

import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase.js';

import ChatBox from '../../components/ChatBox.jsx';
import Games from '../../components/games/Games.jsx';
import '../pages/Game.css'

function Game() {
    const [players, setPlayers] = useState([]);

    const { state } = useLocation();
    const { displayName, userId } = state;
    console.log({ displayName, userId });

    useEffect(() => {
        // Create reference for the specified lobby in the 'lobbies' collection
        const lobbyRef = doc(db, 'lobbies', this.lobbyCode);

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
                <h1>GAMECADE</h1>
                <div className="container">
                    <div className="left">
                        <h2>Lobby: {lobbyCode}</h2>
                        <div className="players">
                            <h2>Players</h2>
                            <ul>
                                {players.map((player, index) => (
                                    <li key={index}>{player}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <Games lobbyCode={lobbyCode} displayName={displayName} userId={userId} />
                </div>
                <ChatBox />
            </div>
        );
    } else {
        <div>Not logged in.</div>
    };
};

export default withRouter(Game)