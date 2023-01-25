import {configureFonts} from "react-native-paper";
export const makeFontConfig = (regular: string, medium: string) => {
  const fontConfig = {
    displaySmall: {
      // fontFamily: regular,
      fontSize: 36,
      // fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 44,
    },
  };

  return configureFonts({config: fontConfig});
};
