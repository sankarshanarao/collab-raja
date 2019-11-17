var socket=io.connect('http://localhost:3000');

hljs.configure({   // optionally configure hljs
  languages: ['python']
});

var quill = new Quill('#editor', {
	modules: {
	    syntax: true,              // Include syntax module
	    toolbar: [
		    ['code-block']
		]
	},
	theme: 'snow'
});

quill.on('text-change', function(delta, oldDelta, source) {
	if (source == 'api') {
		console.log('Recieved a delta through api');
	} else if (source == 'user') {
		sendDelta(delta);
	}
})

socket.on('applyDelta', (delta)=>{
	console.log('in applydelta')
	quill.updateContents(delta);
})
function sendDelta(delta) {
	socket.emit('sendDelta',delta);
}
