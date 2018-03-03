import React, { Component } from 'react';
import platform from 'platform';
import firebase from 'firebase';
// Temporary: LocaleCode is being loaded globally as a script tag - import dep has compile errors

import speechInspector from './speech-inspector';
import VoicesTable from './VoicesTable/VoicesTable';
import chromeLogo from './platform-logos/chrome.svg';
import firefoxLogo from './platform-logos/firefox.svg';
import edgeLogo from './platform-logos/edge.svg';
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
    this.signInAnonymously();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        console.log(uid);
        speechInspector.init().then(() => {
          const { voices } = speechInspector.getSpeechInfo();
          const langs = this.getLangs(voices);

          this.createNewSpeechInfo(uid, voices);
          this.setState({ voices, langs });
        });
        // ...
      } else {
        // User is signed out.
        // ...
      }
      // ...
    });
  }

  getLangs(voices) {
    return [...new Set(voices.map(voice => voice.lang))];
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

  createNewSpeechInfo(uid, voices, langs) {
    firebase
      .database()
      .ref(`${uid}/`)
      .set({
        voices,
        browserName: platform.name,
        browserVersion: platform.version,
        osFamily: platform.os.family,
        osVersion: platform.os.version
      });
  }
  signInAnonymously() {
    firebase
      .auth()
      .signInAnonymously()
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
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
          {speechInspector.isSupported()
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
