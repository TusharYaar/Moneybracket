import defaultThemes from '../../data/defaultThemes';
import {ADD_THEME, SET_THEME, MERGE_THEMES} from '../actions/allThemes';
const initialState = {
  currentTheme: defaultThemes[0],
  allThemes: defaultThemes,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case MERGE_THEMES:
      return {...state, allThemes: [...allThemes, ...payload]};
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
