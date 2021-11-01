export const ADD_THEME = 'ADD_THEME';
export const MERGE_THEMES = 'MERGE_THEMES';
export const SET_THEME = 'SET_THEME';

export const changeTheme = payload => ({
  type: SET_THEME,
  payload,
});

export const addTheme = payload => ({
  type: ADD_THEME,
  payload: payload,
});

export const mergeThemes = payload => ({
  type: MERGE_THEMES,
  payload,
});
