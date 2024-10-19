import { Redirect } from 'expo-router';
import { useSettings } from 'providers/SettingsProvider';
import React, { useEffect } from 'react';
import { DefaultCategories } from "data/dummy";
import { useData } from 'providers/DataProvider';
import { COLORS } from 'data';
import { Category } from 'types';
import { View, Text } from 'react-native';

const MainScreen = () => {
  // Handle Auth Here

  const {isFirstLaunch, updateSettings} = useSettings();
  const {addCategory, fetchData, migration_success, migration_error} = useData();

  useEffect(() => {
    if (!migration_success) return;
    if (isFirstLaunch === "true") {
      const date = new Date();
      const values:Omit<Category, "_id">[] = DefaultCategories.map(cat => ({...cat, 
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        createdAt: date,
        updatedAt: date,
        isFavorite: false,
      })) 
      addCategory(values);
      updateSettings("isFirstLaunch", "false");
    } else {
      fetchData();
    }
  
  },[migration_success]);

  if (migration_error) {
    return (
      <View>
        <Text>Migration error: {migration_error.message}</Text>
      </View>
    );
  }

  if (!migration_success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return <Redirect href="stack/(tabs)/transaction" />;
};

export default MainScreen;