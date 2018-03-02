import React, { Component } from 'react';
import platform from 'platform';
import LocaleCode from 'locale-code';

import tts from './tts';
import Table from './Table/Table';
import './App.css';

class App extends Component {
  state = {
    voices: [],
    langs: []
  };

  componentDidMount() {
    tts.init().then(() => {
      const { voices, langs } = tts.getSpeechInfo();
      this.setState({ voices, langs });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Browser Speech Synthesis API support</h1>
        </header>
        <Table data={this.state.voices} />
        <h2>Platform</h2>
        <pre>{JSON.stringify(platform, null, 2)}</pre>
        <h2>Voices</h2>
        <pre>{JSON.stringify(this.state.voices, null, 2)}</pre>
      </div>
    );
  }
}

export default App;
