const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const port = 3000;
let messages = [];
app.use(cors({ origin: '*' }));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// Define routes
app.get('/chats', (req, res) => {
    const chatList = [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
        // Add more users as needed
    ];
    res.json(chatList);
});

app.get('/messages', (req, res) => {
    const messages = [
        { id: 1, sender: 'User 1', text: 'Hello!' },
        { id: 2, sender: 'User 2', text: 'Hi there!' },
        // Add more messages as needed
    ];
    res.json(messages);
})

app.post('/messages', (req, res) => {
    const newMessage = req.body;
    messages.push(newMessage);
    res.status(201).json(newMessage);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/service-worker.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'service-worker.js'));
});
app.use(express.static(path.join(__dirname, 'build')));
