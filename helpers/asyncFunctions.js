import AsyncStorage from '@react-native-async-storage/async-storage';
import th from 'date-fns/esm/locale/th/index.js';

import defaultCategories from '../data/categories';

const APP_SETTINGS = '@app_settings';
const USER_SETTINGS = '@user_settings';
const CATEGORIES = '#categories';

/**
 * @async
 * @returns User settings
 */
export const getAppSettings = () => {
  // function to get app settings form async storage
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
