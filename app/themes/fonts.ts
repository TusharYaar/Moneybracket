import {configureFonts} from "react-native-paper";
import {FontObject} from "../types";
import {makeFontConfig} from "../utils/fonts";

const AVALIBLE_FONTS: FontObject[] = [
  {
    id: "montserrat",
    name: "Montserrat",
    fontConfig: configureFonts(
      makeFontConfig(
        "Montserrat-Thin",
        "Montserrat-Light",
        "Montserrat-Regular",
        "Montserrat-Medium",
      ),
    ),
  },
  {
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
  {
    id: "mali",
    name: "Mali",
    fontConfig: configureFonts(
      makeFontConfig("Mali-Light", "Mali-Light", "Mali-Regular", "Mali-Medium"),
    ),
  },
  {
    id: "caveat",
    name: "Caveat",
    fontConfig: configureFonts(
      makeFontConfig(
        "Caveat-Regular",
        "Caveat-Regular",
        "Caveat-Medium",
        "Caveat-Bold",
      ),
    ),
  },
  {
    id: "poppins",
    name: "Poppins",
    fontConfig: configureFonts(
      makeFontConfig(
        "Poppins-Light",
        "Poppins-Light",
        "Poppins-Regular",
        "Poppins-Medium",
      ),
    ),
  },
  {
    id: "zillaslab",
    name: "Zilla Slab",
    fontConfig: configureFonts(
      makeFontConfig(
        "ZillaSlab-Light",
        "ZillaSlab-Light",
        "ZillaSlab-Regular",
        "ZillaSlab-Medium",
      ),
    ),
  },
  {
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
];

export default AVALIBLE_FONTS;
