import React, { useContext, createContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  DefaultTheme,
  Theme,
  Provider as PaperProvider,
} from "react-native-paper";

import Ionicons from "react-native-vector-icons/Ionicons";

interface CustomTheme extends Theme { }

type Props = {
  current?: string;
  changeTheme: (theme: string) => void;
  theme: CustomTheme;
};

const ThemeContext = createContext<Props>({
  current: "default",
  changeTheme: () => { },
  theme: DefaultTheme,
});

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [theme, setTheme] = useState<CustomTheme>(DefaultTheme);
  const handleThemeChange = () => {
    setTheme(DefaultTheme);
  };
  return (
    <ThemeContext.Provider
      value={{
        changeTheme: handleThemeChange,
        theme,
      }}
    >
      <PaperProvider theme={theme} settings={{
        icon: props => <Ionicons {...props} />,
      }} >
        <NavigationContainer>{children}</NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
