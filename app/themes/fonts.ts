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
  firacode: {
    id: "firacode",
    name: "Fira Code",
    fontConfig: configureFonts(
      makeFontConfig(
        "FiraCode-Light",
        "FiraCode-Light",
        "FiraCode-Regular",
        "FiraCode-Medium",
      ),
    ),
  },
  mali: {
    id: "mali",
    name: "Mali",
    fontConfig: configureFonts(
      makeFontConfig("Mali-Light", "Mali-Light", "Mali-Regular", "Mali-Medium"),
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
