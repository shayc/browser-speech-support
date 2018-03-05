import LocaleCode from 'locale-code';
import LanguageTags from 'language-tags';

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

  getCountry: code => {
    return LocaleCode.getCountryName(code)
  },

  getFullLanguage: code => {
    return LocaleCode.validateLanguageCode(code)
      ? LocaleCode.getLanguageName(code)
      : LanguageTags.language(code).descriptions()[0] // if only BCP 47 supplied
  },

  mapVoices(voices) {
    return voices.map(voice => ({
      default: voice.default,
      lang: voice.lang,
      localService: voice.localService,
      name: voice.name,
      voiceURI: voice.voiceURI,
      country: this.getCountry(voice.lang),
      language: this.getFullLanguage(voice.lang)
    }));
  },

  init() {
    return this.getVoices().then(voices => this.mapVoices(voices));
  }
};

export default speechInspector;
