const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
server = app.listen(port);

const io = require('socket.io')(server);

io.on('connection', (socket) => {
	console.log('New user connected')

	socket.on('sendDelta', (delta) => {
		console.log(delta);
		socket.broadcast.emit('applyDelta', delta);
	})
});


console.log('Open 0.0.0.0:' + port + ' on your browser.');
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});
