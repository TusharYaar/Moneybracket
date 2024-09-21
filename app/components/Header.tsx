import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
import { useTheme } from "providers/ThemeProvider";

interface Props {
  title?: string;
  hideBackButton?: boolean;
  headerBtns?: {
    onPress: () => void;
    icon: string;
    label: string;
    disabled?: boolean;
  }[];
  style?: StyleProp<ViewStyle>;
}

const Header = ({ title = "", hideBackButton = false, headerBtns = [], style }: Props) => {
  const router = useRouter();
  const {colors ,textStyle: {header}} = useTheme();
    return (
    <View style={[styles.headerContainer, { columnGap: 16}, style]}>
      {router.canGoBack && !hideBackButton ? (
        <Pressable onPress={router.back}>
          <View style={[styles.headerActionBtn, {backgroundColor: colors.headerBackground }]}>
            <Octicons name="chevron-left" size={24} color={colors.headerIconActive} />
          </View>
        </Pressable>
      ) : null}
      <View style={[styles.titleContianer,{backgroundColor: colors.headerBackground }]}>
        <Text style={[header, { color: colors.headerText }]}>{title}</Text>
      </View>
      {headerBtns.length > 0 && (
        <View style={{ flexDirection: "row", columnGap: 8 }}>
          {headerBtns.map((btn) => (
            <Pressable onPress={btn.onPress} disabled={btn.disabled === true} key={btn.label}>
              <View style={[styles.headerActionBtn,{backgroundColor: colors.headerBackground }]}>
                <Octicons
                  name={btn.icon as undefined}
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
    // paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  titleContianer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    height: 64,
    flexGrow: 1,
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
