import { FontObject } from "../../types";
import montserrat from "./monstserrat";
import firacode from "./firacode";
import sanserif from "./sanserif";
import lexend from "./lexend";
import caveat from "./caveat";
import notosans from "./notosans";
import poppins from "./poppins";
import zillaslab from "./zillaslab";
import serif from "./serif";
import monospace from "./monospace";

const AVALIBLE_FONTS: FontObject[] = [
  {
    id: "serif",
    name: "Serif",
    font: serif,
  },
  {
    id: "sanserif",
    name: "San Serif",
    font: sanserif,
  },
  {
    id: "monospace",
    name: "Monospace",
    font: monospace,
  },
  {
    id: "montserrat",
    name: "Montserrat",
    font: montserrat,
    isPaid: true,
  },
  // TODO: ADD mono code
  // TODO: ADD serif
];

export const ALL_FONTS: FontObject[] = [
  {
    id: "montserrat",
    name: "Montserrat",
    font: montserrat,
    isPaid: true,
  },
  {
    id: "firacode",
    name: "Fira Code",
    font: firacode,
    isPaid: true,
  },
  {
    id: "lexend",
    name: "Lexend",
    font: lexend,
    isPaid: true,
  },
  {
    id: "caveat",
    name: "Caveat",
    font: caveat,
    isPaid: true,
  },
  {
    id: "notosans",
    name: "Noto Sans",
    font: notosans,
    isPaid: true,
  },
  {
    id: "poppins",
    name: "Poppins",
    font: poppins,
    isPaid: true,
  },
  {
    id: "zillaslab",
    name: "Zilla Slab",
    font: zillaslab,
    isPaid: true,
  },
];
export default AVALIBLE_FONTS;
