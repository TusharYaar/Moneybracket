import React from "react";

import AppNavigator from "./navigators/AppNavigator";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from "@eva-design/eva";
import { ApplicationProvider,IconRegistry } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";

const AppContainer = () => {
  return (
    <NavigationContainer>
       <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
       <AppNavigator />
      </ApplicationProvider>
    </NavigationContainer>
  );
};

export default AppContainer;

