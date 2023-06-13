import { useRef, useEffect, useState } from 'react';

import { doc, onSnapshot, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.js';

import Paintbar from './Paintbar';
import '../drawtools/Draw.css'

export default function Draw(props) {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);


    // * Drawing Code --
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineColor, setLineColor] = useState('black');
    const [lineWidth, setLineWidth] = useState(5);
    const [lineOpacity, setLineOpacity] = useState(0.1);

    const [showResultsPage, setShowResultsPage] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = lineOpacity;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctxRef.current = ctx;
    }, [lineColor, lineOpacity, lineWidth]);

    const startDrawing = (e) => {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY
        );
        setIsDrawing(true);
    };

    const endDrawing = () => {
        ctxRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = (e) => {
        if (!isDrawing) {
            return;
        }
        ctxRef.current.lineTo(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY
        );
        
        ctxRef.current.stroke();
    };
    // * Drawing Code

    // * Code to get user status
    useEffect(() => {
        if (props.lobbyCode) {
            // Create reference for the specified lobby in the 'lobbies' collection
            const lobbyRef = doc(db, 'lobbies', props.lobbyCode);

            // Setup a listener for changes in the document - https://firebase.google.com/docs/firestore/query-data/listen
            const unsubscribe = onSnapshot(lobbyRef, (snapshot) => {
                const lobbyData = snapshot.data();

                const totalNumberOfPlayers = lobbyData.players.length;
                const playersCompleted = lobbyData.players.filter((player) => player.drawingStatus === 'COMPLETE');
                
                if (playersCompleted.length === totalNumberOfPlayers) {
                    setShowResultsPage(true);
                }
            });

            // Clean up the listener when the component is unmounted
            return () => unsubscribe();
        }
    }, []);
    // * Code to get user status


    const handleDrawingComplete = async () => {
        try {
            const lobbyRef = doc(db, 'lobbies', props.lobbyCode);
            const lobbySnapshot = await getDoc(lobbyRef);

            if (lobbySnapshot.exists()) {

                const oldPlayers = lobbySnapshot.data().players;
                console.log("old players", oldPlayers)

                const newPlayers = oldPlayers.map((player) => {
                    if (player.id === props.userId) {
                        player.drawingStatus = 'COMPLETE'
                    }
                    return player;
                });

                console.log("new players", newPlayers)

                await updateDoc(lobbyRef, {
                    players: newPlayers
                });
            }
        } catch (err) {
            console.error('Error handling drawing complete', err);
        }
    }

    if (showResultsPage) {
        return (<div>This is the results page you are DONE</div>)
    } else {
        return (
            <div className="draw">
                <Paintbar 
                    setLineColor={setLineColor}
                />
                <canvas 
                    onMouseDown={startDrawing}
                    onMouseUp={endDrawing}
                    onMouseMove={draw}
                    ref={canvasRef}
                    width={`1280px`}
                    height={`720`}
                />
                <button onClick={handleDrawingComplete}>Done</button>
            </div>
        )
    }
}