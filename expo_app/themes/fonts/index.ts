import {FontObject} from "../../types";
import montserrat from "./monstserrat";
import firacode from "./firacode";
import sanserif from "./sanserif";
import lexend from "./lexend";
import caveat from "./caveat";
import notosans from "./notosans";
import poppins from "./poppins";
import zillaslab from "./zillaslab";

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
  {
    id: "caveat",
    name: "Caveat",
    font: caveat,
  },
  {
    id: "notosans",
    name: "Noto Sans",
    font: notosans,
  },
  {
    id: "poppins",
    name: "Poppins",
    font: poppins,
  },
  {
    id: "zillaslab",
    name: "Zilla Slab",
    font: zillaslab,
  },
];
export default AVALIBLE_FONTS;
