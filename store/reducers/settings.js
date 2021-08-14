import {UPDATE_THEME, SET_SETTINGS, UPDATE_LANGUAGE} from '../actions/settings';
const initialState = {
  theme: 'light',
  language: 'en',
  date: {
    timezone: 'India',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    dateTimeFormat: 'DD/MM/YYYY HH:mm',
  },
  currency: {
    symbol: '₹', //base currency to which the expense will be added
    base: 'INR',
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
    case UPDATE_THEME || UPDATE_LANGUAGE:
      return {...state, ...payload};
    case SET_SETTINGS:
      return {...payload};
    default:
      return state;
  }
};
