import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_SETTINGS = '@app_settings';
const USER_SETTINGS = '@user_settings';

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
      console.log(error);
      reject(error);
    }
  });
};

export const setAppSettings = settings => {
  return new Promise(async (resolve, reject) => {
    try {
      AsyncStorage.setItem(APP_SETTINGS, JSON.stringify(settings));
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
