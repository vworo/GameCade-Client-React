import { useState } from 'react';

import Draw from '../drawtools/Draw.jsx';
import '../games/Games.css';

export default function Games(props) {
    const [currentGame, setCurrentGame] = useState();
    const { lobbyCode, displayName, userId } = props;

    if(!currentGame) {
        console.log("No current game");

        return (
            <div>
                <h1>Game Modes:</h1>
                <div className="game-modes">
                    <div className="game-card" onClick={() => setCurrentGame('WRITE_AND_DRAW')}>
                        <h3>WRITE AND DRAW</h3>
                        <div className="hide">
                            <p>Write and draw alternately until you reach the last turn.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        console.log(`Current game: ${ currentGame }`);

        if (currentGame === 'WRITE_AND_DRAW') {
            return (
                <Draw lobbyCode={lobbyCode} userId={userId} displayName={displayName} />
            )
        };
    };
};