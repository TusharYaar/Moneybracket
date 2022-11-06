import {Fonts} from "react-native-paper/lib/typescript/types";
export const makeFontConfig = (
  thin: string,
  light: string,
  regular: string,
  medium: string,
) => {
  const fontObj: Fonts = {
    regular: {
      fontFamily: regular,
      fontWeight: "normal",
    },
    medium: {
      fontFamily: medium,
      fontWeight: "normal",
    },
    light: {
      fontFamily: light,
      fontWeight: "normal",
    },
    thin: {
      fontFamily: thin,
      fontWeight: "normal",
    },
  };

  return {
    android: fontObj,
    ios: fontObj,
    web: fontObj,
    default: fontObj,
  };
};
