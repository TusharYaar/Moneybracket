export const UPDATE_THEME = 'UPDATE_THEME';
export const SET_SETTINGS = 'SET_SETTINGS';
export const UPDATE_SECURITY = 'UPDATE_SECURITY';
export const UPDATE_CURRENCY = 'UPDATE_CURRENCY';
export const UPDATE_DATE = 'UPDATE_DATE';
export const UPDATE_LANGUAGE = 'UPDATE_LANGUAGE';

export const updateLanguage = payload => ({
  type: UPDATE_LANGUAGE,
  payload,
});

export const updateTheme = payload => ({
  type: UPDATE_THEME,
  payload,
});
