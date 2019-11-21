const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
server = app.listen(port);

const io = require('socket.io')(server);

hashCode = function(s) {
	return s.toString(36);
  };

function generateCollabId() {
	var collabId = "";
	var date = new Date();
	collabId = date.getTime();
	collabId = hashCode(collabId);
	return collabId;
}


io.on('connection', (socket) => {
	console.log('New user connected') 
	
	socket.on('sendDelta', function(cId, delta) {
		socket.to(cId).emit('applyDelta', delta);
		console.log('sending delta', cId, delta);
		//socket.broadcast.emit('applyDelta', delta);
	})

	socket.on('collabId', function(){
		var collabId = generateCollabId()
		console.log('Sending collab id' + collabId)
		socket.emit('collabId', collabId)
		//Add to room over here
		socket.join(collabId, function() {
			console.log("User joined room " + collabId);
		});
	})

	socket.on('collabWithId', function(collabId){
		//Add to room over here
		socket.join(collabId, function() {
			console.log("User joined room " + collabId);
		});
	})
});


console.log('Open 0.0.0.0:' + port + ' on your browser.');
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});
