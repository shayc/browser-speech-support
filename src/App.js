import React, { Component } from 'react';
import platform from 'platform';
import firebase from 'firebase';
// Temporary: LocaleCode is being loaded as a script tag, and is available globally - import has compile errors

import tts from './tts';
import VoicesTable from './VoicesTable/VoicesTable';
import chromeLogo from './chrome.svg';
import firefoxLogo from './firefox.svg';
import edgeLogo from './edge.svg';
import './App.css';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyDl71mqdNDoc3KzSGTvmdrwgZGZm5UTtAM',
  authDomain: 'browser-speech-support.firebaseapp.com',
  databaseURL: 'https://browser-speech-support.firebaseio.com',
  projectId: 'browser-speech-support',
  storageBucket: 'browser-speech-support.appspot.com',
  messagingSenderId: '748618421543'
};
firebase.initializeApp(config);

class App extends Component {
  state = {
    voices: [],
    langs: []
  };

  componentDidMount() {
    tts.init().then(() => {
      const { voices, langs } = tts.getSpeechInfo();
      this.createNewSpeechInfo(voices);
      this.setState({ voices, langs });
    });
  }

  getBrowserLogo(browserName) {
    switch (browserName) {
      case 'Chrome':
        return chromeLogo;
      case 'Firefox':
        return firefoxLogo;
      case 'Microsoft Edge':
        return edgeLogo;
      default:
      // no default
    }
  }

  createNewSpeechInfo(voices) {
    firebase
      .database()
      .ref('browser/voices')
      .set(voices);
  }

  render() {
    console.log(JSON.stringify(this.state, null, 2));
    console.log(JSON.stringify(platform, null, 2));
    const browserName = platform.name;
    const browserLogo = this.getBrowserLogo(browserName);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Browser Speech Synthesis API support</h1>
        </header>
        <h2>
          {tts.isSupported()
            ? 'Your browser supports Speech Synthesis API'
            : "Your browser doesn't support Speech Synthesis API"}
        </h2>
        <ul>
          <li>
            Browser:{' '}
            {browserLogo && (
              <img src={browserLogo} alt={browserName} width="24" height="24" />
            )}{' '}
            {browserName} {platform.version}
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
