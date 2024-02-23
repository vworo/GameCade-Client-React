'use client'

import ChatBox from '../../components/ChatBox.jsx';
import Sidebar from '../../components/sidebar/Sidebar';

import './Dashboard.css';

export default function Dashboard() {
    return (
        <div>
            <ChatBox />
            <Sidebar />
        </div>
    );
};