// api.js
import axios from 'axios';

const apiUrl = 'http://localhost:3000';

export const fetchMessages = async () => {
    try {
        const response = await axios.get(`${apiUrl}/messages`);
        console.log('Chat List Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching chat list:', error);
        return [];
    }
};

export const fetchChatList = async () => {
    try {
        const response = await axios.get(`${apiUrl}/chats`);
        return response.data;
    } catch (error) {
        console.error('Error fetching chat list:', error);
        return [];
    }
};
export const sendMessage = async (id, sender, text) => {
    try {
        const response = await axios.post(`${apiUrl}/messages`, {
            id,
            sender,
            text,
        });
        console.log('Message sent successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};
