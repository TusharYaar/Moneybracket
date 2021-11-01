import {themeDetailsToObject} from '../../helpers/asyncFunctions';
import defaultThemes from '../../data/defaultThemes';
import {ADD_THEME, SET_THEME, MERGE_THEMES} from '../actions/allThemes';

const defaultThemeObjects = defaultThemes.map(theme =>
  themeDetailsToObject(theme),
);

const initialState = {
  currentTheme: defaultThemeObjects[0],
  allThemes: defaultThemeObjects,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case MERGE_THEMES:
      return {...state, allThemes: [...state.allThemes, ...payload]};
    case ADD_THEME:
      return {...state, allThemes: [...state.allThemes, payload]};
    case SET_THEME:
      return {
        ...state,
        currentTheme: state.allThemes.find(theme => theme.id === payload),
      };
    default:
      return state;
  }
};
