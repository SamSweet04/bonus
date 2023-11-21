// ChatWindow.js
import React, { useState, useEffect } from 'react';
import { fetchMessages, sendMessage } from '../api/api';
import './ChatWindow.css';

const ChatWindow = ({ selectedChat }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchMessagesData = async () => {
            const messagesData = await fetchMessages();
            setMessages(messagesData);
        };

        fetchMessagesData();
    }, []);

    const selectedChatMessages = messages.filter(
        (msg) => msg.sender === selectedChat || msg.id === selectedChat
    );

    const handleSendMessage = async () => {
        try {
            if (newMessage.trim() !== '') {

                await sendMessage(selectedChat, newMessage);


                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        id: prevMessages.length + 1, // Assuming id is incremental
                        sender: selectedChat,
                        text: newMessage,
                    },
                ]);

                // Clear the input field
                setNewMessage('');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat-window">
            <h2>{selectedChat ? `Chat with ${selectedChat}` : 'Select a chat'}</h2>
            <div className="messages">
                {selectedChatMessages.map((msg) => (
                    <div key={msg.id}>
                        <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            {selectedChat && (
                <div className="message-input">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;
