import { CustomTheme } from "types";

export const defaultT: CustomTheme = {
  name: "Default Theme",
  id: "default",
  isVisible: true,
  statusbar: "dark",
  colors: {
    headerBackground: "#010a19",
    headerIconActive: "#e63946",
    headerIconDisabled: "#8a909c",
    headerText: "#a8dadc",
    screen: "#f2f2f2",
    statusbar: "#f2f2f2",
    
    sectionBackground: "#d9f6fc",
    rippleColor: "#010a1930",
    
    tabbarBackground: "#010a19",
    tabbarIcon: "#a8dadc",
    tabbarIconActive: "#e63946",
    tabbarIconDisabled: "#8a909c",
    tabbarBackgroundSecondary: "#a8dadc",
    tabbarIconActiveSecondary: "#e63946",
    
    income: "#3c6134",
    expense: "#fe5a5a",
    transfer: "#3f6dbb",

    text: "#0f0f0f"
},
  // image:
  //   "https://res.cloudinary.com/tusharyaar/image/upload/c_scale,h_2280,q_78/v1676718255/MoneyBracket/Screenshot_1676655142_itbtcr.png",
};



export const darkT: CustomTheme = {
  name: "Dark Theme",
  id: "dark",
  isVisible: true,
  statusbar: "light",
  colors: {
    headerBackground: "#010a19",
    headerIconActive: "#e63946",
    headerIconDisabled: "#8a909c",
    headerText: "#cca53c",
    screen: "#202020",
    statusbar: "#202020",
    
    sectionBackground: "#2b2b2b",
    rippleColor: "#010a1930",
    
    tabbarBackground: "#010a19",
    tabbarIcon: "#cca53c",
    tabbarIconActive: "#e63946",
    tabbarIconDisabled: "#8a909c",
    tabbarBackgroundSecondary: "#383e4a",
    tabbarIconActiveSecondary: "#e63946",
    
    income: "#85ea2d",
    expense: "#fe5a5a",
    transfer: "#3f6dbb",

    text: "#f4f7ff"
},
  // image:
  //   "https://res.cloudinary.com/tusharyaar/image/upload/c_scale,h_2280,q_78/v1676718255/MoneyBracket/Screenshot_1676655142_itbtcr.png",
};







const ALL_THEMES = [defaultT, darkT];
export default ALL_THEMES;