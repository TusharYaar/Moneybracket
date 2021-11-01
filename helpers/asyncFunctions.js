import AsyncStorage from '@react-native-async-storage/async-storage';

import defaultCategories from '../data/categories';
import Theme from '../models/theme';
const APP_SETTINGS = '@app_settings';
const THEMES = '@themes';
const CATEGORIES = '@categories';

/**
 * @async
 * @returns User settings
 * @description function to get app settings form async storage
 */
export const getAppSettings = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.getItem(APP_SETTINGS);
      if (value) {
        resolve({...JSON.parse(value), loaded: true});
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * @async
 * @param {object} settings
 * @returns
 */
export const setAppSettings = settings => {
  console.log('settings App settings');
  return new Promise(async (resolve, reject) => {
    try {
      AsyncStorage.setItem(
        APP_SETTINGS,
        JSON.stringify({...settings, loaded: false, locked: true}),
      );
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const removeSettings = () => {
  console.log('Removing settings');
  return new Promise(async (resolve, reject) => {
    try {
      AsyncStorage.removeItem(APP_SETTINGS);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
export const setCategories = categories => {
  return new Promise(async (resolve, reject) => {
    try {
      AsyncStorage.setItem(CATEGORIES, JSON.stringify({categories}));
      resolve({categories});
    } catch (error) {
      reject(error);
    }
  });
};
export const getCategories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.getItem(CATEGORIES);
      if (value) resolve({...JSON.parse(value)});
      else {
        await setCategories(defaultCategories);
        resolve({categories: defaultCategories});
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const addCategoryToDB = category => {
  return new Promise(async (resolve, reject) => {
    try {
      const categories = await getCategories();
      const newCategories = [...categories.categories, category];
      await setCategories(newCategories);
      resolve(newCategories);
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteCategoryFromDB = category => {
  return new Promise(async (resolve, reject) => {
    try {
      const categories = await getCategories();
      const newCategories = categories.categories.filter(
        item => item.category !== category,
      );
      await setCategories(newCategories);
      resolve(newCategories);
    } catch (error) {
      reject(error);
    }
  });
};

export const removeCategories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      AsyncStorage.removeItem(CATEGORIES);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const themeDetailsToObject = ({
  id,
  label,
  isDark = false,
  primary,
  secondary,
  background,
  paper,
  text,
}) => {
  return new Theme(
    id,
    label,
    isDark,
    primary,
    secondary,
    background,
    paper,
    text,
  );
};

export const setThemes = themes => {
  return new Promise(async (resolve, reject) => {
    try {
      AsyncStorage.setItem(THEMES, JSON.stringify({themes}));
      resolve({themes});
    } catch (error) {
      reject(error);
    }
  });
};

export const getThemes = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.getItem(THEMES);
      if (value) resolve({...JSON.parse(value)});
      else {
        resolve({themes: []});
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const addThemeToDB = theme => {
  return new Promise(async (resolve, reject) => {
    try {
      const themes = await getThemes();
      const newThemes = [...themes.themes, theme];
      await setThemes(newThemes);
      console.log(newThemes);
      resolve(newThemes);
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteThemeFromDB = theme => {
  return new Promise(async (resolve, reject) => {
    try {
      const themes = await getThemes();
      const newThemes = themes.themes.filter(item => item.theme !== theme);
      await setThemes(newThemes);
      resolve(newThemes);
    } catch (error) {
      reject(error);
    }
  });
};
