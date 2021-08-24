import Languages from '../languages/languages';

export const translateAppText = (
  language = 'en',
  nativeNumbers = true,
  key = 'undefined',
  tag,
) => {
  if (tag === 'numbers') {
    if (!nativeNumbers) {
      return key;
    }
    var translatedText = '';
    if (typeof key === 'object') {
      key = key.join('');
    }
    for (var i = 0; i < key.length; i++) {
      if (key[i] >= '0' && key[i] <= '9')
        translatedText += Languages[language][tag][key[i]];
      else translatedText += key[i];
    }
    return translatedText;
  } else if (tag) return Languages[language][tag][key];
  return Languages[language].translations[key];
};

export const getFont = (language = 'en', type = 'reglar') => {
  return Languages[language].fonts[type];
};

export const mapNavigationData = (data = [], language = 'en') => {
  return data.map(item => ({
    ...item,
    title: translateAppText(language, item.key, false),
  }));
};
