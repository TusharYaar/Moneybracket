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

export const ALL_FONTS: FontObject[] = [
  {
    id: "serif",
    name: "Serif",
    font: serif,
    files: [],
  },
  {
    id: "sanserif",
    name: "San Serif",
    font: sanserif,
    files: [],
  },
  {
    id: "monospace",
    name: "Monospace",
    font: monospace,
    files: [],
  },
  {
    id: "montserrat",
    name: "Montserrat",
    font: montserrat,
    isPaid: true,
    files: [
      {
        name: "Montserrat-Medium",
        link: "https://res.cloudinary.com/tusharyaar/raw/upload/v1676740123/MoneyBracket/Fonts/Montserrat-Medium_wva963.ttf",
      },
      {
        name: "Montserrat-Bold",
        link: "https://res.cloudinary.com/tusharyaar/raw/upload/v1676740122/MoneyBracket/Fonts/Montserrat-Bold_vviwx7.ttf",
      },
    ],
  },
  {
    id: "firacode",
    name: "Fira Code",
    font: firacode,
    isPaid: true,
    files: [
      {
        name: "FiraCode-Medium",
        link: "https://res.cloudinary.com/tusharyaar/raw/upload/v1676740122/MoneyBracket/Fonts/FiraCode-Medium_kcvuoc.ttf",
      },
      {
        name: "FiraCode-Regular",
        link: "https://res.cloudinary.com/tusharyaar/raw/upload/v1676740121/MoneyBracket/Fonts/FiraCode-Regular_il6qjq.ttf",
      },
    ],
  },
  {
    id: "lexend",
    name: "Lexend",
    font: lexend,
    isPaid: true,
    files: [
      {
        name: "Lexend-SemiBold",
        link: "https://res.cloudinary.com/tusharyaar/raw/upload/v1676740121/MoneyBracket/Fonts/Lexend-SemiBold_eshn5y.ttf",
      },
      {
        name: "Lexend-Regular",
        link: "https://res.cloudinary.com/tusharyaar/raw/upload/v1676740121/MoneyBracket/Fonts/Lexend-Regular_uwfomd.ttf",
      },
    ],
  },
  {
    id: "caveat",
    name: "Caveat",
    font: caveat,
    isPaid: true,
    files: [
      {
        name: "Caveat-Medium",
        link: "https://res.cloudinary.com/tusharyaar/raw/upload/v1676740122/MoneyBracket/Fonts/Caveat-Medium_k6fcli.ttf",
      },
      {
        name: "Caveat-Bold",
        link: "https://res.cloudinary.com/tusharyaar/raw/upload/v1676740121/MoneyBracket/Fonts/Caveat-Bold_vuk6bh.ttf",
      },
    ],
  },
  {
    id: "notosans",
    name: "Noto Sans",
    font: notosans,
    isPaid: true,
    files: [
      {
        name: "NotoSans-Medium",
        link: "https://res.cloudinary.com/tusharyaar/raw/upload/v1676740124/MoneyBracket/Fonts/NotoSans-Medium_imf9tb.ttf",
      },
      {
        name: "NotoSans-Bold",
        link: "https://res.cloudinary.com/tusharyaar/raw/upload/v1676740123/MoneyBracket/Fonts/NotoSans-Bold_qxfsxn.ttf",
      },
    ],
  },
  {
    id: "poppins",
    name: "Poppins",
    font: poppins,
    isPaid: true,
    files: [
      {
        name: "Poppins-Medium",
        link: "https://res.cloudinary.com/tusharyaar/raw/upload/v1676740121/MoneyBracket/Fonts/Poppins-Medium_qvvmlj.ttf",
      },
      {
        name: "Poppins-Regular",
        link: "https://res.cloudinary.com/tusharyaar/raw/upload/v1676740123/MoneyBracket/Fonts/Poppins-Regular_rteoet.ttf",
      },
    ],
  },
  {
    id: "zillaslab",
    name: "Zilla Slab",
    font: zillaslab,
    isPaid: true,
    files: [
      {
        name: "ZillaSlab-Medium",
        link: "https://res.cloudinary.com/tusharyaar/raw/upload/v1676740122/MoneyBracket/Fonts/ZillaSlab-Medium_sqfaux.ttf",
      },
      {
        name: "ZillaSlab-Regular",
        link: "https://res.cloudinary.com/tusharyaar/raw/upload/v1676740121/MoneyBracket/Fonts/ZillaSlab-Regular_shxvo0.ttf",
      },
    ],
  },
];
export default ALL_FONTS;
