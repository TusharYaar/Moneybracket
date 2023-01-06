import {FontObject} from "../../types";
import montserrat from "./monstserrat";
import firacode from "./firacode";
import sanserif from "./sanserif";
import lexend from "./lexend";
const AVALIBLE_FONTS: FontObject[] = [
  {
    id: "montserrat",
    name: "Montserrat",
    font: montserrat,
  },
  {
    id: "firacode",
    name: "Fira Code",
    font: firacode,
  },
  {
    id: "sanserif",
    name: "San Serif",
    font: sanserif,
  },
  {
    id: "lexend",
    name: "Lexend",
    font: lexend,
  },
];
export default AVALIBLE_FONTS;
