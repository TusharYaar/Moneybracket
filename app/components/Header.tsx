import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";

interface Props {
  title?: string;
  showBackButton?: boolean;
  headerBtns?: {
    onPress: () => void;
    icon: string;
    label: string;
    disabled?: boolean;
  }[];
  style?: StyleProp<ViewStyle>;
}

const Header = ({ title = "", showBackButton = true, headerBtns = [], style }: Props) => {
  const router = useRouter();
  return (
    <View style={[styles.headerContainer, { columnGap: 16 }, style]}>
      {router.canGoBack && showBackButton ? (
        <Pressable onPress={router.back}>
          <View style={styles.headerActionBtn}>
            <Octicons name="chevron-left" size={24} color="#e63946" />
          </View>
        </Pressable>
      ) : null}
      <View style={styles.titleContianer}>
        <Text style={{ color: "#a8dadc", fontSize: 32 }}>{title}</Text>
      </View>
      {headerBtns.length > 0 && (
        <View style={{ flexDirection: "row", columnGap: 8 }}>
          {headerBtns.map((btn) => (
            <Pressable onPress={btn.onPress} disabled={btn.disabled === true} key={btn.label}>
              <View style={styles.headerActionBtn}>
                <Octicons
                  name={btn.icon as undefined}
                  size={24}
                  color={btn.disabled === true ? "#8a909c" : "#e63946"}
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
    backgroundColor: "#010a19",
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
    backgroundColor: "#010a19",
  },
});
