import { Theme_TextStyle } from "types";
const mediumVariants = ["amountInput", "body", "label"];
const regularVariants = ["header", "title", "amount", "caption"];

const defaults = {
  label: {
    fontSize: 12,
    letterSpacing: 0.25,
  },

  body: {
    fontSize: 16,
    letterSpacing: 0.25,
  },
  amountInput: {
    fontSize: 32,
    letterSpacing: 0.25,
  },
  header: {
    fontSize: 32,
    letterSpacing: 0.1,
  },
  title: {
    fontSize: 20,
    letterSpacing: 0.15,
  },
  caption: {
    fontSize: 32,
    letterSpacing: 0.25,
  },
  amount: {
    fontSize: 18,
    letterSpacing: 0.25,
  },
};

export const makeFontConfig = (
  regular: string,
  medium: string,
  sizeMultiplier = 1,
  spacingMultiplier = 1
): Theme_TextStyle => {
  let config = {};
  mediumVariants.forEach((v) => {
    config[v] = {
      fontSize: defaults[v].fontSize * sizeMultiplier,
      letterSpacing: defaults[v].letterSpacing * spacingMultiplier,
      fontFamily: medium,
    };
  });
  regularVariants.forEach((v) => {
    config[v] = {
      fontSize: defaults[v].fontSize * sizeMultiplier,
      letterSpacing: defaults[v].letterSpacing * spacingMultiplier,
      fontFamily: regular,
    };
  });

  return config as Theme_TextStyle;
};
