import { useState, useEffect, useRef } from 'react';
import { db, auth } from '../firebase.js';
import { collection, onSnapshot, addDoc, orderBy, query } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

import './ChatBox.css';

export default function ChatBox() {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [expanded, setExpanded] = useState(false);

  const router = useRouter();
  const messagesEndRef = useRef();
  const chatContainerRef = useRef(null);


  // * This shouldn't be here
  // useEffect(() => {
  //   if (!user) {
  //     // Redirect to the login page if the user is not authenticated
  //     router.push('/');
  //   }
  // }, [user]);

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

  // Listen to messages update and trigger scrollToBottom if messages have been changed.
  useEffect(() => {
    scrollToBottom();
  }, [messages, user, expanded]);

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
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded)
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      if (expanded) {
        chatContainerRef.current.style.display = 'flex';
      } else {
        chatContainerRef.current.style.display = 'none';
      }
    }
  }, [expanded]);

  return (
    <div className={`chat ${expanded ? 'expanded' : ''}`}>
      <div className="chat-button" onClick={toggleExpanded}>
        <span>CHAT</span>
      </div>

      <div className='chat-container' ref={chatContainerRef}>
        <div className='messages-container'>
          {messages.map(({ id, data }) => (
            <div key={id} className={`message ${data.uid === user.uid ? 'sent' : 'received'}`}>
              <span className='display-name'>{data.displayName || data.uid}: </span>
              <span className='message-text'>{data.text}</span>
            </div>
          ))}

                    <div ref={messagesEndRef}></div>
                </div>

                <form onSubmit={sendMessage} className='messages-form'>
                    <input value={input} onChange={handleInputChange} placeholder='Type a message' />
                    <button type='submit'>SEND</button>
                </form>
            </div>
        </div>
    );
}
