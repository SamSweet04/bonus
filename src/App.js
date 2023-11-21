// App.js
import React, { useState, useEffect } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import { fetchMessages, fetchChatList } from './api/api';

const App = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatList, setChatList] = useState([]);

    const handleChatSelect = (chatId) => {
        setSelectedChat(chatId);
    };

    useEffect(() => {
        // Fetch messages and chat list when the component mounts
        const fetchData = async () => {
            const messagesData = await fetchMessages();
            const chatListData = await fetchChatList();

            setMessages(messagesData);
            setChatList(chatListData);
        };

        fetchData();
    }, []);

    return (
        <div className="app-container">
            <ChatList chatList={chatList} onChatSelect={handleChatSelect} />
            <ChatWindow selectedChat={selectedChat} messages={messages} />
        </div>
    );
};

export default App;
