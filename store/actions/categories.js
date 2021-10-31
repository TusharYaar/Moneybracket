export const SET_CATEGORIES = 'SET_CATEGORIES';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const setCategories = payload => ({
  type: SET_CATEGORIES,
  payload,
});

export const deleteCategory = payload => ({
  type: DELETE_CATEGORY,
  payload,
});

export const addCategory = payload => ({
  type: ADD_CATEGORY,
  payload,
});
