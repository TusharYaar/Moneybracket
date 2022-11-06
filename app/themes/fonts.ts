import {configureFonts} from "react-native-paper";
import {makeFontConfig} from "../utils/fonts";

const AVALIBLE_FONTS = {
  montserrat: {
    id: "montserrat",
    name: "Montserrat",
    fontConfig: configureFonts(
      makeFontConfig(
        "Montserrat-Thin",
        "Montserrat-Light",
        "Montserrat-Regular",
        "Montserrat-Bold",
      ),
    ),
  },
  teko: {
    id: "teko",
    name: "Teko",
    fontConfig: configureFonts(
      makeFontConfig("Teko-Thin", "Teko-Light", "Teko-Regular", "Teko-Medium"),
    ),
  },
  notosans: {
    id: "notosans",
    name: "Noto Sans",
    fontConfig: configureFonts(
      makeFontConfig(
        "NotoSans-Thin",
        "NotoSans-Light",
        "NotoSans-Regular",
        "NotoSans-Medium",
      ),
    ),
  },
};

export default AVALIBLE_FONTS;
