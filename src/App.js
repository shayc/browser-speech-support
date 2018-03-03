import React, { Component } from 'react';
import platform from 'platform';
import LocaleCode from 'locale-code';

import tts from './tts';
import VoicesTable from './VoicesTable/VoicesTable';
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
    console.log(JSON.stringify(this.state, null, 2));

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Browser Speech Synthesis API support</h1>
        </header>
        <h2>
          {tts.isSupported()
            ? 'Your browser supports Speech Synthesis API'
            : 'Your browser doesn\'t support Speech Synthesis API'}
        </h2>
        <ul>
          <li>
            Browser: {platform.name} {platform.version}
          </li>
          <li>
            OS: {platform.os.family} {platform.os.version}
          </li>
          <li>Voices: {this.state.voices.length}</li>
          <li>Languages: {this.state.langs.length}</li>
        </ul>
        <VoicesTable data={this.state.voices} />
      </div>
    );
  }
}

export default App;
