import { FontObject } from "../types";
import { makeFontConfig } from "../utils/fonts";

export const ALL_FONTS: FontObject[] = [
  {
    id: "lexend",
    name: "Lexend",
    by: "Bonnie Shaver-Troup, Thomas Jockin, Santiago Orozco, Héctor Gómez, Superunion ",
    font: makeFontConfig("Lexend-Regular", "Lexend-Regular"),
    isPaid: false,
    isVisible: true,
  },
  {
    id: "sansserif",
    name: "Sans Serif",
    isPaid: false,
    isVisible: true,
    by: "",
    font: makeFontConfig("sans-serif", "sans-serif-medium"),
  },
  {
    id: "serif",
    name: "Serif",
    isPaid: false,
    isVisible: true,
    by: "",
    font: makeFontConfig("serif", "serif"),
  },
  {
    id: "monospace",
    name: "Monospace",
    isPaid: false,
    isVisible: true,
    by: "",
    font: makeFontConfig("monospace", "monospace"),
  },
  {
    id: "montserrat",
    name: "Montserrat",
    font: makeFontConfig("Montserrat-Medium", "Montserrat-Bold"),
    by: "Julieta Ulanovsky, Sol Matas, Juan Pablo del Peral, Jacques Le Bailly",
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
    by: "Nikita Prokopov",
    name: "Fira Code",
    font: makeFontConfig("FiraCode-Regular", "FiraCode-Medium"),
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
    id: "caveat",
    name: "Caveat",
    by: "Impallari Type",
    font: makeFontConfig("Caveat-Medium", "Caveat-Bold", 1.3),

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
    by: "Google",
    font: makeFontConfig("NotoSans-Medium", "NotoSans-Bold"),

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
    by: "Indian Type Foundry, Jonny Pinhorn",
    font: makeFontConfig("Poppins-Regular", "Poppins-Medium"),
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
    font: makeFontConfig("ZillaSlab-Regular", "ZillaSlab-Medium"),
    by: "Typotheque",
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
  {
    id: "starjedi",
    name: "Star Jedi",
    font: makeFontConfig("StarJedi", "StarJedi", 1, 1),
    by: "Boba Fonts",
    isPaid: true,
    files: [
      {
        name: "StarJedi",
        link: "https://res.cloudinary.com/tusharyaar/raw/upload/v1677435347/MoneyBracket/Fonts/StarJedi_kkoqmu.ttf",
      },
    ],
  },
  {
    id: "timeburner",
    name: "Time Burner",
    font: makeFontConfig("TimeburnerBold", "TimeburnerBold"),
    by: "NimaType",
    isPaid: true,
    files: [
      {
        name: "TimeburnerBold",
        link: "https://res.cloudinary.com/tusharyaar/raw/upload/v1677260841/MoneyBracket/Fonts/TimeburnerBold_woyyhg.ttf",
      },
    ],
  },
];
export default ALL_FONTS;
