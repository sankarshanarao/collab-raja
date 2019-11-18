const express = require('express');
const app = express();
const path=require('path');
const port = process.env.PORT || 3000;
server = app.listen(port);

const io = require('socket.io')(server);

hashCode = function(s) {
	// var h = 0, l = s.length, i = 0;
	// if ( l > 0 )
	//   while (i < l)
	// 	h = (h << 5) - h + s.charCodeAt(i++) | 0;
	return s.toString(36);
  };

function generateCollabId() {
	var collabId = "";
	var date = new Date();
	collabId = date.getTime();
	collabId = "/" + hashCode(collabId);
	return collabId;
}


io.on('connection', (socket) => {
	console.log('New user connected') 
	
	socket.on('sendDelta', function(cId, delta) {
		socket.to(cId).emit('applyDelta', delta);
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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});
