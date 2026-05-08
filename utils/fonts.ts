import { Theme_TextStyle } from "types";
const mediumVariants = ["amountInput", "label", "bodyBold", "display"];
const regularVariants = ["header", "title", "amount", "caption", "body"];

const defaults = {
  label: {
    fontSize: 12,
    letterSpacing: 0.25,
  },
  bodyBold: {
    fontSize: 18,
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
    fontSize: 26,
    letterSpacing: 0.25,
  },
  amount: {
    fontSize: 18,
    letterSpacing: 0.25,
  },
  display: {
    fontSize: 38,
    letterSpacing: 0.25,
  },
};

export const makeFontConfig = (
  regular: string,
  medium: string,
  sizeMultiplier = 1,
  spacingMultiplier = 1,
  monoFont?: string
): Theme_TextStyle => {
  let config = {};
  
  // Amount-related variants use monospace font if provided
  const amountVariants = ["amount", "amountInput"];
  
  mediumVariants.forEach((v) => {
    config[v] = {
      fontSize: defaults[v].fontSize * sizeMultiplier,
      letterSpacing: defaults[v].letterSpacing * spacingMultiplier,
      fontFamily: amountVariants.includes(v) && monoFont ? monoFont : medium,
    };
  });
  regularVariants.forEach((v) => {
    config[v] = {
      fontSize: defaults[v].fontSize * sizeMultiplier,
      letterSpacing: defaults[v].letterSpacing * spacingMultiplier,
      fontFamily: amountVariants.includes(v) && monoFont ? monoFont : regular,
    };
  });

  return config as Theme_TextStyle;
};
