import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_SETTINGS = '@app_settings';
const USER_SETTINGS = '@user_settings';

export const getAppSettings = async () => {
  // function to get app settings form async storage
  try {
    const value = await AsyncStorage.getItem(APP_SETTINGS);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.log(error);
  }
};


export const setAppSettings = async (settings) => {
    // function to set app settings
    try {
        

    }
}
