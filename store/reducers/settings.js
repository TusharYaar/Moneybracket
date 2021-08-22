import {
  UPDATE_THEME,
  UPDATE_SETTINGS,
  SET_SETTINGS,
  UPDATE_SECURITY,
  UPDATE_LANGUAGE,
  DEFAULT_SETTINGS,
} from '../actions/settings';
const initialState = {
  theme: 'light',
  onboardingDone: true,
  loaded: false,
  locked: true,
  language: 'en',
  date: {
    timezone: 'India',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    dateTimeFormat: 'DD/MM/YYYY HH:mm',
  },
  currency: {
    base: 'INR', //base currency to which the expense will be added
    symbol: '₹', //base currency symbol
    favorites: [], //favorites currency which will be shown
  },
  security: {
    enabled: false,
    type: 'pin', //value should be in [pin, biometric],
    pin: '',
    biometric: null,
    randomKeys: false,
  },
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case UPDATE_SETTINGS:
      return {...state, ...payload};
    case UPDATE_LANGUAGE:
      return {...state, ...payload};
    case SET_SETTINGS:
      return {...payload, loaded: true}; //set this back to normal
    // return {...initialState, loaded: true};
    case DEFAULT_SETTINGS:
      return {...initialState, loaded: true};

    case UPDATE_SECURITY:
      return {...state, locked: false, security: {...payload}};
    default:
      return state;
  }
};
