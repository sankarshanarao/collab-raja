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

    this.state = {
      collabId: 'Loading...',
    }

    this.setupSocket = this.setupSocket.bind(this);
    this.sendDelta = this.sendDelta.bind(this);
    this.setupSocketWithQuill = this.setupSocketWithQuill.bind(this);
  }

  setupSocket(collabId) {
    console.log('settingup Socket', collabId, this.quill);
    const socIp = document.location.host.split(':')[0];
    const socket = io.connect('http://' + socIp + ':3000');
    this.socket = socket;

    if (collabId) {
      console.log('second collab');

      this.setState({
        ...this.state,
        collabId,
      });

      socket.emit('collabWithId', collabId);

      this.setupSocketWithQuill();

    } else {  // first collaborator
      console.log('first collab');
      this.socket.emit('collabId');

      this.socket.on('collabId', cid => {
        this.setState({
          ...this.state,
          collabId: cid,
        });

        this.setupSocketWithQuill();
      });
    }
  }

  setupSocketWithQuill() {
    console.log(this.quill);
    this.quill.on('text-change', (delta, oldDelta, source) => {
      if (JSON.stringify(delta.ops[1]) === '{"insert":" "}') {
        var currPos = this.quill.getSelection(true).index;
        var lineList = this.quill.getText(0, currPos).split('\n');
        var currLine = lineList[lineList.length - 1];
        console.log(currLine);

        this.getSuggestions(currLine);
      }
      if (source === 'api') {
        console.log('Recieved a delta through api');
      } else if (source === 'user') {
        this.sendDelta(delta, this.collabId);
      }
    });

    this.socket.on('applyDelta', (delta) => {
      console.log('applyDeltaCount');
      this.quill.updateContents(delta);
    })
  }

  sendDelta(delta) {
    console.log('sendDeltacount');
    this.socket.emit('sendDelta', this.state.collabId, delta);
  }

  componentDidMount() {
    const quill = new Quill('.quill-container', {
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline'],
          ['link', 'image'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['code-block'],

        ]
      },
      theme: 'snow',
    });

    this.quill = quill;
  }

  getSuggestions(line) {
    console.log("Getting suggestions");
    const lstmIP = '192.168.43.138:9078';
    fetch('http://' + lstmIP + '/test').then(res => console.log(res));
  }
  render() {
    return (
      <div className="App">
        <div className="navbar">
          <h5>CollabRaja</h5>
          <img src={kingImg} alt="king" className="king-icon" />
          <div className='widget-cont'>
            <CollabWidget socket={this.setupSocket} collabId={this.state.collabId} />
          </div>
        </div>
        <div className='quill-container'>
        </div>
      </div>
    );
  }
}

export default App;
