import React from "react";
import { Octicons, MaterialIcons } from "@expo/vector-icons";
import { TextStyle } from "react-native";

import { ICONS } from "data";
import { useSettings } from "providers/SettingsProvider";

type IconProps = {
  name: string;
  size: number;
  color?: string;
  style?: TextStyle;
};

const IconComponentList = {
  default: Octicons,
  material: MaterialIcons,
};

const Icon = ({ name, size, color = "#000", style }: IconProps) => {
  const { icon } = useSettings();
  const IconComponent = IconComponentList[icon];
  return (
    <IconComponent
      name={ICONS[icon][name] ? ICONS[icon][name] : (ICONS[icon].undefined as undefined)}
      size={size}
      color={color}
      style={style}
    />
  );
};

export default Icon;
