import React, { Component } from 'react';
import _ from 'lodash';
import platform from 'platform';
import firebase from 'firebase';
// Temporary: LocaleCode is being loaded globally as a script tag - import dep has compile errors

import speechInspector from './speech-inspector';
import AppBar from './AppBar/AppBar';
import PlatformSummary from './PlatformSummary/PlatformSummary';
import PlatformVoices from './PlatformVoices/PlatformVoices';
import LanguageSearch from './LanguageSearch/LanguageSearch';
import chromeLogo from './logos/chrome.svg';
import firefoxLogo from './logos/firefox.svg';
import edgeLogo from './logos/edge.svg';
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
    const onLogin = user => {
      console.log('User logged in anonymously!');
    };

    this.onAuthStateChanged(onLogin);
    this.signInAnonymously();

    speechInspector.init().then(voices => {
      this.setState({ voices });
    });
  }

  getUniqueLangs(voices) {
    return _.uniq(voices.map(voice => voice.lang));
    // return [...new Set(voices.map(voice => voice.lang))];
  }

  filterLocalServices(voices) {
    return voices.filter(voice => voice.localService);
    // return [...new Set(voices.map(voice => voice.lang))];
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

  signInAnonymously() {
    return firebase
      .auth()
      .signInAnonymously()
      .catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  }

  onAuthStateChanged(onLogin = user => {}, onLogout = () => {}) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        onLogin(user);
      } else {
        onLogout();
      }
    });
  }

  writeSpeechData(uid, platform, voices) {
    firebase
      .database()
      .ref(`dump/${uid}/`)
      .set({
        browserName: platform.name,
        browserVersion: platform.version,
        osFamily: platform.os.family,
        osVersion: platform.os.version,
        voices
      });
  }

  render() {
    const summary = {
      browserName: platform.name,
      browserVersion: platform.version,
      osFamily: platform.os.family,
      osVersion: platform.os.version,
      langs: this.getUniqueLangs(this.state.voices).length,
      voices: this.state.voices.length,
      localServices: this.filterLocalServices(this.state.voices).length
    };

    return (
      <div className="App">
        <AppBar />
        <div className="App__main">
          <LanguageSearch />
          <PlatformSummary summary={summary} />
          <PlatformVoices voices={this.state.voices} />
        </div>
      </div>
    );
  }
}

export default App;
