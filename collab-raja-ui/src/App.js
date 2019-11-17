import React from 'react';
import ReactQuill from 'react-quill';
import './App.css';
import 'react-quill/dist/quill.snow.css';
import kingImg from './773-27-512.png';

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <img src={kingImg} alt="king" className="king-icon" />
      </div>
      <div className='quill-container'> 
        <ReactQuill className="quillEditor" theme="snow"/>
      </div>  
      
    </div>
  );
}

export default App;
