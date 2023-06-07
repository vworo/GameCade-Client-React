import { useState, useEffect, useRef } from 'react';
import { db, auth } from '../firebase.js';
import { collection, onSnapshot, addDoc, orderBy, query } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import SignIn from './SignIn.jsx';
import SignOut from './SignOut.jsx';
import './ChatBox.css';

export default function ChatBox() {
    const [user] = useAuthState(auth);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    
    const messagesEndRef = useRef();

    useEffect(() => {
        // Create Firestore query to retrieve the 'messages' collection and order it by the 'timestamp' field
        const q = query(collection(db, 'messages'), orderBy('timestamp'));

        // Set up a realtime listener on the Firestore query
        const unsubscribe = onSnapshot(q, (snapshot) => {
            // When changes occur in the collection, update the 'messages' state
            setMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });

        // Return the cleanup function to unsubscribe the listener 
        return () => unsubscribe();
    }, []);

    // Listen to messages update and trigger scrollToBottom if messages has been changed.
    // TODO: figure out why this works on page refresh but not upon signIn
    useEffect(() => {
        scrollToBottom();
    }, [messages, user]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const sendMessage = async (e) => {
        e.preventDefault();

        // Checks if input is not empty, trim removes any trailing whitespace
        if (input.trim()) {
            // addDoc Firebase function to add a new document to the 'messages' collection
            await addDoc(collection(db, 'messages'), {
                text: input,
                timestamp: new Date(),
                uid: user.uid,
                displayName: user.displayName,
            });

            // Clear input
            setInput('');
        };
    };

    return (
        <div>
            <h2>Messenger</h2>

            <SignOut />

            {user ? (
                <div className='chat-container'>
                    {messages.map(({id, data}) => (
                        <div key={id} className={`message ${data.uid === user.uid ? 'sent' : 'received'}`}>
                            <span className='display-name'>{data.displayName}: </span>
                            <span className='message-text'>{data.text}</span>
                        </div>
                    ))}

                    <div ref={messagesEndRef}></div>

                    <form onSubmit={sendMessage}>
                        <input value={input} onChange={handleInputChange} placeholder='Type a message' />
                        <button type='submit'>Send</button>
                    </form>
                </div>
            ) : (
                <SignIn />
            )}

            
        </div>
    );
};
