import React, { Component } from 'react';
import platform from 'platform';

import speechSupport from './speech-support';
import './App.css';

class App extends Component {
  state = {};

  componentDidMount() {
    tts.getVoices().then(voices=>{

    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Browser Speech Synthesis API support</h1>
        </header>

        <h2>Platform</h2>
        <pre>{JSON.stringify(platform, null, 2)}</pre>
        <pre>{JSON.stringify(, null, 2)}</pre>
      </div>
    );
  }
}

export default App;
