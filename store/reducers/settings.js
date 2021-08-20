import {UPDATE_THEME, SET_SETTINGS, UPDATE_LANGUAGE} from '../actions/settings';
const initialState = {
  theme: 'light',
  loaded: false,
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
    type: null, //value should be in [pin, biometric],
    pin: null,
    biometric: null,
    randomKeys: false,
  },
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case UPDATE_LANGUAGE:
      return {...state, ...payload};
    case SET_SETTINGS:
      return {...payload};
    default:
      return state;
  }
};
