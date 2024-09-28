import { Redirect } from 'expo-router';
import React from 'react';

const MainScreen = () => {
  // Handle Auth Here
  return <Redirect href="Stack/(tabs)/transaction" />;
};

export default MainScreen;