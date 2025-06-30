import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ActivityIndicator } from "react-native";
import { authenticateAsync } from "expo-local-authentication";
import { useRouter } from "expo-router";
import { useTheme } from "providers/ThemeProvider";

const LockedScreen = () => {
  const [authenticating, setAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { colors, textStyle } = useTheme();

  const handleAuth = async () => {
    setAuthenticating(true);
    setError(null);
    try {
      const result = await authenticateAsync({
        promptMessage: "Authenticate to unlock",
        fallbackLabel: "Use Passcode",
        disableDeviceFallback: false,
      });
      
      if (result.success) {
        router.replace("/"); // Go to home or main screen
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (e) {
      setError("An error occurred during authentication.");
    }
    setAuthenticating(false);
  };

  useEffect(() => {
    handleAuth();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.screen }]}>
      <Text style={[textStyle.title, { marginBottom: 24 }]}>App Locked</Text>
      <Text style={[textStyle.body, { marginBottom: 32 }]}>
        Please authenticate to continue.
      </Text>
      {authenticating ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Authenticate" onPress={handleAuth} />
      )}
      {error && (
        <Text style={[textStyle.body, { marginTop: 16 }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default LockedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
});
