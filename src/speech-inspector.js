
const speechInspector = {
  voices: [],

  isSupported: () => 'speechSynthesis' in window,

  mapVoices(voices) {
    return voices.map(voice => ({
      default: voice.default,
      lang: voice.lang,
      localService: voice.localService,
      name: voice.name,
      voiceURI: voice.voiceURI
    }));
  },

  getSpeechInfo() {
    const mappedVoices = this.mapVoices(this.voices);
    const langs = this.getLangs();
    const info = {
      voices: mappedVoices,
      langs
    };
    return info;
  },

  getVoices() {
    return new Promise((resolve, reject) => {
      // iOS
      const voices = window.speechSynthesis.getVoices() || [];
      if (voices.length) {
        resolve(voices);
      }

      // Android
      if ('onvoiceschanged' in window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = () => {
          const voices = window.speechSynthesis.getVoices();
          resolve(voices);
        };
      }
    });
  },

  getLangs() {
    return [...new Set(this.voices.map(voice => voice.lang))];
  },

  init() {
    return this.getVoices().then(voices => {
      this.voices = voices;
    });
  }
};

export default speechInspector;
