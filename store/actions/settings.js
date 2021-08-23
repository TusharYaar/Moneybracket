export const UPDATE_THEME = 'UPDATE_THEME';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const SET_SETTINGS = 'SET_SETTINGS';
export const UPDATE_SECURITY = 'UPDATE_SECURITY';
export const UPDATE_CURRENCY = 'UPDATE_CURRENCY';
export const UPDATE_DATE = 'UPDATE_DATE';
export const UPDATE_LANGUAGE = 'UPDATE_LANGUAGE';
export const DEFAULT_SETTINGS = 'DEFAULT_SETTINGS';

import {setAppSettings} from '../../helpers/asyncFunctions';

export const updateLanguage = payload => {
  return (dispatch, getState) => {
    const {settings} = getState();
    setAppSettings({...settings, ...payload});
    dispatch({
      type: UPDATE_LANGUAGE,
      payload,
    });
  };
};

export const updateTheme = payload => ({
  type: UPDATE_THEME,
  payload,
});

export const setDefaultSettings = payload => {
  return async (dispatch, getState) => {
    const {settings} = getState();
    // await setAppSettings(settings);
    dispatch({type: DEFAULT_SETTINGS});
  };
};

export const setSettings = payload => ({
  type: SET_SETTINGS,
  payload,
});

export const updateSecurity = payload => {
  return async (dispatch, getState) => {
    const {settings} = getState();
    await setAppSettings({...settings, security: {...payload}});
    dispatch({
      type: UPDATE_SECURITY,
      payload,
    });
  };
};

export const updateLockedStatus = payload => ({type: UPDATE_SETTINGS, payload});

export const updateFavorites = payload => {
  return async (dispatch, getState) => {
    const {settings} = getState();
    await setAppSettings({
      ...settings,
      currency: {...settings.currency, ...payload},
    });
    dispatch({type: UPDATE_CURRENCY, payload});
  };
};
