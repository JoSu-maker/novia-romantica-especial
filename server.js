const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/karol-g-special', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'karol-g-special.html'));
});

// Socket.IO para efectos especiales
io.on('connection', (socket) => {
    console.log('Usuario conectado');
    
    socket.on('playMusic', (data) => {
        socket.broadcast.emit('musicPlayed', data);
    });
    
    socket.on('showHeart', (data) => {
        socket.broadcast.emit('heartShown', data);
    });
    
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`💕 Web romántica lista para tu novia!`);
}); 