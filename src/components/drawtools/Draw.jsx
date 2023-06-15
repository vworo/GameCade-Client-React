import { useRef, useEffect, useState } from 'react';

import { doc, onSnapshot, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase.js';
import { ref, uploadString, getDownloadURL, listAll, uploadBytes } from 'firebase/storage';

import Paintbar from './Paintbar';
import '../drawtools/Draw.css'

export default function Draw(props) {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const storageRef = ref(storage, `${ props.lobbyCode }`);

    // * Drawing Code --
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineColor, setLineColor] = useState('black');
    const [lineWidth, setLineWidth] = useState(5);
    const [lineOpacity, setLineOpacity] = useState(0.1);

    const [showResultsPage, setShowResultsPage] = useState(false);
    const [canvasImages, setCanvasImages] = useState([]);

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
                    fetchCanvasImages();
                    setShowResultsPage(true);
                }
            });

            // Clean up the listener when the component is unmounted
            return () => unsubscribe();
        }
    }, []);
    // * Code to get user status

    const fetchCanvasImages = async () => {
        try {
            const imagesRef = ref(storageRef);
            const imagesList = await listAll(imagesRef);
            const imageUrls = await Promise.all(
                imagesList.items.map(async (item) => {
                    const imageUrl = await getDownloadURL(item);
                    return imageUrl;
                })
            );
            setCanvasImages(imageUrls);
            console.log('Images fetched');
        } catch (error) {
            console.error('Error fetching canvas images:', error);
        }
    };

    const saveCanvasImage = async () => {
        try {
            const canvasDataUrl = canvasRef.current.toDataURL('image/png');
            const canvasBlob = await (await fetch(canvasDataUrl)).blob();
        
            const imageRef = ref(storageRef, `${props.userId}-${props.lobbyCode}.png`);
            await uploadBytes(imageRef, canvasBlob, { contentType: 'image/png' });
            await fetchCanvasImages();
        } catch (error) {
            console.error('Error saving canvas image:', error);
        }
    };

    const handleDrawingComplete = async () => {
        try {
            const lobbyRef = doc(db, 'lobbies', props.lobbyCode);
            const lobbySnapshot = await getDoc(lobbyRef);

            if (lobbySnapshot.exists()) {
                const oldPlayers = lobbySnapshot.data().players;

                const newPlayers = oldPlayers.map((player) => {
                    if (player.id === props.userId) {
                        player.drawingStatus = 'COMPLETE';
                    }
                    return player;
                });

                await Promise.all([
                    updateDoc(lobbyRef, {
                        players: newPlayers,
                    }),
                    saveCanvasImage(),
                ]);
            }
        } catch (err) {
            console.error('Error handling drawing complete', err);
        }
    };

    if (showResultsPage) {
        return (
            <div>
                {canvasImages.map((imageUrl, index) => (
                    <img key={index} src={imageUrl} alt={`Canvas from ${ props.userId }`} />
                ))}
            </div>
        )
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