import { Redirect } from "expo-router";
import { useSettings } from "providers/SettingsProvider";
import React, { useCallback, useEffect, useState } from "react";
import { DefaultCategories } from "data/dummy";
import { useData } from "providers/DataProvider";
import { COLORS } from "data";
import { Category } from "types";
import { View, Text, Image, Pressable } from "react-native";
import { authenticateAsync } from "expo-local-authentication";
import { useTheme } from "providers/ThemeProvider";

const MainScreen = () => {
  // Handle Auth Here

  const { isFirstLaunch, updateSettings, appLock } = useSettings();
  const { addCategory, fetchData, migration_success, migration_error } = useData();

  const [unlocked, setUnlocked] = useState(appLock === "DISABLE");
  const {colors,textStyle} = useTheme();

  useEffect(() => {
    if (!migration_success) return;
    if (isFirstLaunch === "true") {
      const date = new Date();
      const values: Omit<Category, "_id">[] = DefaultCategories.map((cat) => ({
        ...cat,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        createdAt: date,
        updatedAt: date,
        isFavorite: false,
      }));
      addCategory(values);
      updateSettings("isFirstLaunch", "false");
    } else {
      fetchData();
    }
  }, [migration_success]);

  useEffect(() => {
    if (appLock === "DISABLE") {
      setUnlocked(true);
    } else {
      handleAuthenticate(appLock);
    }
  }, [appLock]);

  const handleAuthenticate = useCallback(async (type: "BIOMETRIC" | "PIN") => {
    const valid = await authenticateAsync({
      promptMessage: "Unlock App",
      biometricsSecurityLevel: type === "BIOMETRIC" ? "strong" : "weak",
      disableDeviceFallback: type === "BIOMETRIC",
      cancelLabel: 'Cancel',
    });
    if (valid.success) {
      setUnlocked(true);
    }
  }, [setUnlocked]);

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


  if (unlocked || appLock === "DISABLE") {
    return <Redirect href="stack/(tabs)/transaction" />;
  }
  else {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center", padding: 8}}>
      <Image style={{ width: 150, height: 150, borderRadius: 8 }} source={require("assets/christmas-icon.png")} />
      <View style={{width: "50%", backgroundColor: colors.sectionBackground, marginVertical: 24,padding: 8, borderRadius: 8}}>
      <Pressable onPress={() => 
      handleAuthenticate(appLock)
      }
    > 
    <Text style={[textStyle.title,{textAlign: "center"}]}>Unlock</Text>
      </Pressable>
        </View>
    </View>
    )
  }

};

export default MainScreen;
