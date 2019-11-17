const express = require('express');
const app = express();
const path=require('path');
const port = process.env.PORT || 3000;
server = app.listen(port);

const io = require('socket.io')(server);

hashCode = function(s) {
	var h = 0, l = s.length, i = 0;
	if ( l > 0 )
	  while (i < l)
		h = (h << 5) - h + s.charCodeAt(i++) | 0;
	return h;
  };

function generateCollabId() {
	var collabId = "";
	var date = new Date();
	collabId = date.toTimeString();
	collabId = "/" + hashCode(collabId);
	return "/111"
	//return collabId;
}


io.on('connection', (socket) => {
	console.log('New user connected') 

	socket.on('sendDelta', function(cId, delta) {
		console.log("Namespace is" , cId)
		socket.broadcast.emit('applyDelta',delta);
	})

	socket.on('collabId', function(){
		collabId = generateCollabId()
		console.log('Sending collab id' + collabId)
		socket.emit('collabId', collabId)
	})
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});
