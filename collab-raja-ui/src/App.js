import React, { Component } from 'react';
import Quill from 'quill';
import io from 'socket.io-client';
import './App.css';
import 'react-quill/dist/quill.snow.css';
import kingImg from './773-27-512.png';
import CollabWidget from './collab-widget';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {
    // const lstmServer = 'localhost';
    const socketServer = '192.168.1.207:3000';

    const socket = io.connect('http://'+socketServer);

    const quill = new Quill('.quill-container', {
      theme: 'snow'
    });

    this.quill = quill;

    quill.on('text-change', (delta, oldDelta, source) => {
      console.log(delta, source);
    });

    quill.on('text-change', function(delta, oldDelta, source) {

			if(("code-block" in quill.getFormat()) && (JSON.stringify(delta.ops[1]) === '{"insert":" "}')) {
				var currPos = quill.getSelection().index;
				var lineList = quill.getText(0,currPos).split('\n');
				var currLine = lineList[lineList.length-1];
				console.log(currLine);

				getSuggestions(currLine);
			}
			if (source === 'api') {
				console.log('Recieved a delta through api');
			} else if (source === 'user') {
				sendDelta(delta);
			}
		});

		socket.on('applyDelta', (delta)=>{
			console.log('in applydelta')
			quill.updateContents(delta);
		})

		function sendDelta(delta) {
			socket.emit('sendDelta',delta);
		}

		function getSuggestions(currLine) {
			// xhr = new XMLHttpRequest();
			// xhr.open('POST', 'http://'+lstm_server+':9078/predict', true);
			// xhr.setRequestHeader("Content-Type","application/json");
			// xhr.setRequestHeader("Access-Control-Allow-Headers","*");
			// xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
			// xhr.send('{"model":"neural_token", "keyword":"'+currLine+'"}');
			// console.log('Sent request to LSTM');
			// xhr.onreadystatechange = function() {
			// 	if(xhr.readyState==4 && xhr.status==200) {
			// 		console.log(xhr.responseText);
			// 	} else {
			// 		console.log('Error response from lstm');
			// 	}
			// }
		}
  }

  render() {
    return (
      <div className="App">
        <div className="navbar">
        <h5>CollabRaja</h5>
          
          <img src={kingImg} alt="king" className="king-icon" />
          <div className='widget-cont'>
          
            <CollabWidget />
          </div>
          
        </div>
        <div className='quill-container'>
        </div>
      </div>
    );
  }
}

export default App;
