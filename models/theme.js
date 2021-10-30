export default class Theme {
  constructor(
    id,
    name,
    isDark,
    primary,
    secondary,
    background,
    paper,
    text,
    headerText,
  ) {
    this.id = id;
    this.name = name;
    this.dark = isDark;
    this.colors = {
      accent: secondary,
      backdrop: secondary,
      background, //router Background
      border: 'rgb(39, 39, 41)',
      card: paper,
      disabled: 'rgba(255, 255, 255, 0.38)',
      error: '#CF6679',
      notification: 'rgb(255, 69, 58)',
      onSurface: primary,
      placeholder: text,
      primary,
      surface: paper, //react-native-paper
      text, //router text
      headerText, //custom tag for header text color
    };
    this.mode = 'adaptive';
    this.roundness = 4;
    this.animation = {
      scale: 1,
    };
    this.fonts = {
      light: {
        fontFamily: 'NotoSans-Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'NotoSans-Bold',
        fontWeight: 'normal',
      },
      regular: {
        fontFamily: 'NotoSans-Medium',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'NotoSans-light',
        fontWeight: 'normal',
      },
    };
  }
}

// THEMES.darkTheme = {
//     animation: {
//       scale: 1,
//     },
//     dark: true,
//     value: "darkTheme",
//     label: "Dark Theme",
//     colors: {
//       accent: "#03dac6",
//       backdrop: "rgba(0, 0, 0, 0.5)",
//       background: "rgb(1, 1, 1)",
//       border: "rgb(39, 39, 41)",
//       card: "rgb(18, 18, 18)",
//       disabled: "rgba(255, 255, 255, 0.38)",
//       error: "#CF6679",
//       notification: "rgb(255, 69, 58)",
//       onSurface: "#FFFFFF",
//       placeholder: "rgba(255, 255, 255, 0.54)",
//       primary: "rgb(10, 132, 255)",
//       surface: "#121212",
//       text: "rgb(229, 229, 231)",
//     },
//     fonts:fonts,
//     mode: "adaptive",
//     roundness: 4,
//   };
