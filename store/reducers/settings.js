import {
  UPDATE_THEME,
  UPDATE_SETTINGS,
  SET_SETTINGS,
  UPDATE_SECURITY,
  UPDATE_LANGUAGE,
  UPDATE_CURRENCY,
  DEFAULT_SETTINGS,
} from '../actions/settings';
const initialState = {
  theme: 'light',
  onboardingDone: true,
  loaded: false,
  locked: true,
  language: 'en',
  nativeNumbers: false,
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
    type: 'pin', //value should be in [pin, biometrics],
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
      return {...payload, loaded: true};
    // return {...initialState, loaded: true};
    case DEFAULT_SETTINGS:
      return {...initialState, loaded: true};
    case UPDATE_SECURITY:
      return {
        ...state,
        locked: false,
        security: {...state.security, ...payload},
      };
    case UPDATE_CURRENCY:
      return {
        ...state,
        locked: false,
        currency: {...state.currency, ...payload},
      };
    default:
      return state;
  }
};
