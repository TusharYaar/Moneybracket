import { Pressable, StyleSheet, Text, useWindowDimensions, View, ViewStyle } from "react-native";
import React from "react";
import { useTheme } from "providers/ThemeProvider";
import Icon from "./Icon";
import { Route } from "@react-navigation/native";
import { HeaderRightButton } from "types";
import { Link } from "expo-router";
interface Props {
  route: Route<any>
  headerRightButtons: HeaderRightButton[];
  back?: string;
  title?: string;
}

const Header = ({route, back, headerRightButtons, title}: Props) => {
  const {
    colors,
    textStyle: { header },
  } = useTheme();

  const fontSize = 20;
  // const fontSize = useMemo(() => {
  //   if (title) {
  //     const calculated = titleContainerWidth / (0.7 * title.length);
  //     if (calculated < header.fontSize) return Math.floor(calculated);
  //   }
  //   return header.fontSize;
  // }, [title, titleContainerWidth, header]);

  // const titleWidth = useMemo(() => {
  //   //screen width - padding
  //   let w = width - 2 * 16;
  //   if (headerRightBtn && headerRightBtn.length > 0) {
  //     // Subtract  ColumnGap + (rightHeraderButtons * size) + hrightHeaderButton * columnGap
  //     w -= 16 + headerRightBtn.length * 64 + (headerRightBtn.length - 1) * 8;
  //   }
  //   if (back && back?.title) w -= 16 + 64;
  //   return w;
  // }, [headerRightBtn, width, back]);

  return (
    <View style={[styles.headerContainer, { columnGap: 16 }]}>
      {back ? (
        <Link href={`stack/${back}`} dismissTo testID="page-back">
          <View style={[styles.headerActionBtn, { backgroundColor: colors.headerBackground }]}>
            <Icon name="back" size={24} color={colors.headerIconActive} />
          </View>
        </Link>
      ) : null}
      <View
        style={[styles.titleContianer, { backgroundColor: colors.headerBackground }]}
        // onLayout={(event) => setTitleContainerWidth(event.nativeEvent.layout.width)}
      >
        <Text style={[header, { fontSize: fontSize > 0 ? fontSize : 10 }]} testID="header-title">{title}</Text>
      </View>
      {headerRightButtons && headerRightButtons?.length > 0 && (
        <View style={{ flexDirection: "row", columnGap: 8 }}>
          {headerRightButtons.map((btn) => (
            <Pressable onPress={btn.onPress} disabled={btn.disabled === true} key={btn.icon} testID={btn.testId}>
              <View style={[styles.headerActionBtn, { backgroundColor: colors.headerBackground }]}>
                <Icon
                  name={btn.icon}
                  size={24}
                  color={btn.disabled === true ? colors.headerIconDisabled : colors.headerIconActive}
                />
              </View>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  titleContianer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    height: 64,
    flexGrow: 1,
    justifyContent:"center"
  },
  headerActionBtn: {
    padding: 16,
    borderRadius: 8,
    height: 64,
    width: 64,
    alignItems: "center",
    justifyContent: "center",
  },
});
