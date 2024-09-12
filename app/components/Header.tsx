import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";

type Props = {
  title: string;
  showBackButton?: boolean;
  headerBtns?: {
    onPress: () => void;
    icon: string;
    label: string;
  }[];
};

const Header = ({ title, showBackButton = true, headerBtns = [] }: Props) => {
  const router = useRouter();
  return (
    <View style={[styles.headerContainer, headerBtns.length > 0 ? { columnGap: 16 } : {}]}>
      {router.canGoBack && showBackButton ? (
        <View style={styles.headerActionBtn}>
          <Pressable onPress={router.back}>
            <Octicons name="chevron-left" size={24} color="#e63946" style={{ padding: 16 }} />
          </Pressable>
        </View>
      ) : null}
      <View style={styles.titleContianer}>
        <Text style={{ color: "#a8dadc", fontSize: 32 }}>{title}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        {headerBtns.map((btn) => (
          <View style={styles.headerActionBtn} key={btn.label}>
            <Pressable onPress={btn.onPress}>
              <Octicons name={btn.icon as undefined} size={24} color="#e63946" />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
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
