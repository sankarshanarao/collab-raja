import React, { Component } from 'react';
import Quill from 'quill';
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
    const quill = new Quill('.quill-container', {
      theme: 'snow'
    });

    this.quill = quill;

    quill.on('text-change', (delta, oldDelta, source) => {
      console.log(delta, source);
    });
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
