const speechInspector = {
  isSupported: () => 'speechSynthesis' in window,

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

  mapVoices(voices) {
    return voices.map(voice => ({
      default: voice.default,
      lang: voice.lang,
      localService: voice.localService,
      name: voice.name,
      voiceURI: voice.voiceURI
    }));
  },

  init() {
    return this.getVoices().then(voices => this.mapVoices(voices));
  }
};

export default speechInspector;
