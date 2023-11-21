// ChatList.js
import React, { useState, useEffect } from 'react';
import { fetchChatList } from '../api/api';
import './ChatList.css';

const ChatList = ({ onChatSelect }) => {
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const chatListData = await fetchChatList();
            setChatList(chatListData);
        };

        fetchData();
    }, []);

    return (
        <div className="chat-list">
            <h2>Chats</h2>
            <ul>
                {chatList.map((chat) => (
                    <li key={chat.id} onClick={() => onChatSelect(chat.id)}>
                        {chat.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;
