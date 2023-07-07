import type { MD3Typescale } from "react-native-paper/lib/typescript/src/types";

import DefaultConfig from "../data/defaultFontConfig";

const mediumVariants = ["labelLarge", "labelMedium", "labelSmall", "titleMedium", "titleSmall"];
const regularVariants = [
  "bodyLarge",
  "bodyMedium",
  "bodySmall",
  "default",
  "displayLarge",
  "displayMedium",
  "displaySmall",
  "headlineLarge",
  "headlineMedium",
  "headlineSmall",
  "titleLarge",
];

export const makeFontConfig = (regular: string, medium: string, sizeMultiplier = 1, spacingMultiplier = 0) => {
  let config = {};
  mediumVariants.forEach((v) => {
    config[v] = {
      ...DefaultConfig[v],
      fontSize: DefaultConfig[v].fontSize * sizeMultiplier,
      letterSpacing: DefaultConfig[v].letterSpacing * spacingMultiplier,
      fontFamily: medium,
    };
  });
  regularVariants.forEach((v) => {
    config[v] = {
      ...DefaultConfig[v],
      fontFamily: regular,
      fontSize: DefaultConfig[v].fontSize * sizeMultiplier,
      letterSpacing: DefaultConfig[v].letterSpacing * spacingMultiplier,
    };
  });

  return config as MD3Typescale;
};
