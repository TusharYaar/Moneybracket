import {StyleSheet, View, ViewStyle, TextStyle} from "react-native";
import React, {useCallback, useMemo} from "react";
import {Category} from "../realm/Category";
import {Text, TouchableRipple} from "react-native-paper";

import Icon from "react-native-vector-icons/Ionicons";
import {chooseBetterContrast} from "../utils/colors";
import {useCustomTheme} from "../themes";

type Props = {
  category: Category;
  onPress: (category: Category) => void;
  selected: boolean;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
};

const CategoryChip = ({
  category,
  onPress,
  selected,
  style,
  containerStyle,
}: Props) => {
  const {theme} = useCustomTheme();

  const handlePress = useCallback(() => {
    onPress(category);
  }, [onPress, category]);

  const textColor = useMemo(() => {
    return chooseBetterContrast(category.color);
  }, [category]);

  return (
    <View style={[styles.overflowContainer, style]}>
      <TouchableRipple
        onPress={handlePress}
        style={{
          backgroundColor: selected ? category.color : "transparent",
          borderRadius: 50,
        }}
      >
        <View style={[styles.innerContainer, containerStyle]}>
          <Icon
            name={category.icon}
            color={selected ? textColor : category.color}
            size={20}
          />
          <Text
            style={[
              {color: selected ? textColor : theme.colors.text},
              styles.title,
            ]}
          >
            {category.title}
          </Text>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default CategoryChip;

const styles = StyleSheet.create({
  overflowContainer: {
    borderRadius: 50,
    overflow: "hidden",
  },
  innerContainer: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  title: {
    marginLeft: 5,
  },
});
