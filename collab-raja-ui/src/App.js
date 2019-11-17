import React from 'react';
import ReactQuill from 'react-quill';
import './App.css';
import 'react-quill/dist/quill.snow.css';
import kingImg from './773-27-512.png';
import CollabWidget from './collab-widget';

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <div className='widget-cont'>
          <CollabWidget />
        </div>
        <img src={kingImg} alt="king" className="king-icon" />

      </div>
      <div className='quill-container'>
        <ReactQuill className="quillEditor" theme="snow" />
      </div>
    </div>
  );
}

export default App;
