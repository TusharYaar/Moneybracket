import Languages from '../languages/languages';
export const translateAppText = (language = 'en', key = 'undefined', tag) => {
  if (tag) return Languages[language][tag][key];
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
