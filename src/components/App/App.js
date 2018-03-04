import React, { Component } from 'react';
import _ from 'lodash';
import platform from 'platform';
import firebase from 'firebase';
// Temporary: LocaleCode is being loaded globally as a script tag - import dep has compile errors

import chromeJSON from '../../data/chrome.json';
import safariJSON from '../../data/safari.json';
import edgeJSON from '../../data/edge.json';
import firefoxJSON from '../../data/firefox.json';
import speechInspector from '../../speechInspector';
import AppBar from '../AppBar/AppBar';
import Introduction from '../Introduction/Introduction';
import PlatformSummary from '../PlatformSummary/PlatformSummary';
import PlatformVoices from '../PlatformVoices/PlatformVoices';
import BrowserSupportPanel from '../BrowserSupportPanel/BrowserSupportPanel';
import LanguageSearch from '../LanguageSearch/LanguageSearch';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
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
    voices: []
  };

  componentDidMount() {
    const onLogin = user => {
      console.log('User logged in anonymously!');
      speechInspector.init().then(voices => {
        this.writeSpeechData(user.uid, platform, voices);
        this.setState({ voices });
      });
    };

    this.onAuthStateChanged(onLogin);
    this.signInAnonymously();
  }

  getAvailableLangs(voices) {
    return _.uniq(voices.map(voice => voice.lang));
  }

  filterLocalServices(voices) {
    return voices.filter(voice => voice.localService);
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

  formatPlatformsJSON(platforms) {
    return platforms.map(platform => ({
      browserName: platform.browserName,
      browserVersion: platform.browserVersion,
      osFamily: platform.osFamily,
      osVersion: platform.osVersion,
      langs: this.getAvailableLangs(platform.voices).length,
      voices: platform.voices.length,
      localServices: this.filterLocalServices(platform.voices).length
    }));
  }

  render() {
    const summary = {
      browserName: platform.name,
      browserVersion: platform.version,
      osFamily: platform.os.family,
      osVersion: platform.os.version,
      langs: this.getAvailableLangs(this.state.voices).length,
      voices: this.state.voices.length,
      localServices: this.filterLocalServices(this.state.voices).length
    };

    return (
      <div className="App">
        {/* <AppBar /> */}
        <div className="App__main">
          {/* <LanguageSearch /> */}
          <Introduction />
          <BrowserSupportPanel
            chrome={this.formatPlatformsJSON(chromeJSON)}
            safari={this.formatPlatformsJSON(safariJSON)}
            edge={this.formatPlatformsJSON(edgeJSON)}
            firefox={this.formatPlatformsJSON(firefoxJSON)}
          />
          <Typography variant="headline">Your browser:</Typography>
          <div className="Disclaimer">
            <Typography variant="subheading">
              Disclaimer: the data below is being collected anonymously so we can better map Speech Synthesis across platforms.
            </Typography>
          </div>
          <PlatformSummary summary={summary} />
          <PlatformVoices voices={this.state.voices} />
        </div>
      </div>
    );
  }
}

export default App;
