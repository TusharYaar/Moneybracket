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

export const getCategories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.getItem(CATEGORIES);
      if (value) {
        resolve({...JSON.parse(value), loaded: true});
      } else {
        await AsyncStorage.setItem(
          CATEGORIES,
          JSON.stringify({categories: defaultCategories}),
        );
        resolve({categories: defaultCategories, loaded: true});
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteCategoryFromDB = category => {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.getItem(CATEGORIES);
      if (value) {
        const categories = JSON.parse(value).categories;
        const newCategories = categories.filter(
          item => item.category !== category,
        );
        await AsyncStorage.setItem(
          CATEGORIES,
          JSON.stringify({categories: newCategories}),
        );
        resolve(newCategories);
      } else {
        throw new Error('No categories found');
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const removeCategories = () => {
  console.log('Removing Categories');
  return new Promise(async (resolve, reject) => {
    try {
      AsyncStorage.removeItem(CATEGORIES);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
