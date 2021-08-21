import {
  UPDATE_THEME,
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
    type: null, //value should be in [pin, biometric],
    pin: '',
    biometric: null,
    randomKeys: false,
  },
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case UPDATE_LANGUAGE:
      console.log(payload);
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
