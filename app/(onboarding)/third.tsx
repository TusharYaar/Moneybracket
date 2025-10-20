import { View, Text, StyleSheet, ScrollView, useWindowDimensions, TextInput } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable } from "react-native-gesture-handler";

import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { Link } from "expo-router";

import CategoryItem from "@components/CategoryItem";
import PrimaryInput from "@components/AmountInput";
import SwipeButton from "@components/SwipeButton";
import Icon from "@components/Icon";

import { useSettings } from "providers/SettingsProvider";
import { useTheme } from "providers/ThemeProvider";
import { Category, Group } from "types";
import GroupItem from "@components/GroupItem";

const CATEGORY_DATA = [
  {
    _id: "travel",
    createdAt: new Date(),
    updatedAt: new Date(),
    type: "expense",
    color: "#4DB380",
    icon: "travel",
    isFavorite: false,
    title: "Travel",
  },
  {
    _id: "shopping",
    createdAt: new Date(),
    updatedAt: new Date(),
    type: "expense",
    color: "#42b3d5",
    icon: "shopping",
    isFavorite: false,
    title: "Shopping",
  },
];

const GROUP_DATA = [
  {
    _id: "noGroup",
    isFavorite: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    color: "#a5a5a5",
    icon: "unknown",
    description: "No group",
    title: "No Group",
  },
  {
    _id: "paris",
    isFavorite: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    color: "#FFB6C1",
    icon: "icon_94",
    description: "Paris Trip",
    title: "Paris",
  },
  {
    _id: "thailand",
    isFavorite: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    color: "#64B5F6",
    icon: "icon_23",
    description: "Thailand",
    title: "Thailand",
  },
];

const ThirdScreen = () => {
  const { t } = useTranslation("", { keyPrefix: "app.onboarding.third" });
  const { colors, textStyle } = useTheme();
  const { bottom, top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { currency } = useSettings();
  const [step, setStep] = useState(-1);

  const [sheetView, setSheetView] = useState("category");

  const amtRef = useRef<TextInput>(null);
  const sheetRef = useRef<BottomSheet>(null);
  const [category, setCetegory] = useState<Category | null>(null);
  const [group, setGroup] = useState<Group>(GROUP_DATA[0]);

  const selectCategory = useCallback(
    (category: Category) => {
      setStep((prev) => (prev === 3 ? 4 : prev));
      setCetegory(category);
      sheetRef.current?.close();
    },
    [setStep]
  );

  const selectGroup = useCallback(
    (group: Group) => {
      setStep((prev) => (prev === 4 ? 5 : prev));
      setGroup(group);
      sheetRef.current?.close();
    },
    [setStep]
  );

  useEffect(() => {
    setStep(1);
    sheetRef.current?.close();
  }, [setStep]);

  const renderBackdrop  = (props: BottomSheetBackdropProps) => {
      return (
        <BottomSheetBackdrop 
          {...props} 
          opacity={0.5}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      );
    }

  return (
    <>
      <ScrollView contentContainerStyle={{ paddingTop: top + 8, paddingHorizontal: 8, flexGrow: 1, }}>
        <Text style={[textStyle.display, { textAlign: "center", color: colors.text }]}>{t("simple")}</Text>
        {step > 0 && (
          <Animated.View style={styles.section} entering={FadeInUp}>
            <Text style={textStyle.header}>{t("header1")}</Text>
            <Pressable
              onPress={() => {
                setStep((prev) => (prev === 1 ? 2 : prev))
              }}
            >
              <View style={[styles.addBtn, { backgroundColor: colors.tabbarBackgroundSecondary }]}>
                <Icon name="add" size={24} color={colors.tabbarIconActiveSecondary} />
              </View>
            </Pressable>
          </Animated.View>
        )}
        {step > 1 && (
          <Animated.View style={styles.section} entering={FadeInUp}>
            <Text style={textStyle.header}>{t("header2")}</Text>
            <Text style={textStyle.body}>{t("subtext2")}</Text>
            <PrimaryInput
              type="amount"
              autofocus={true}
              onChangeText={() => setStep((prev) => (prev === 2 ? 3 : prev))}
              backgroundColor={category !== null ? category.color : "#C5CAE9"}
              ref={amtRef}
              initialValue={""}
              prefix={currency.symbol_native}
              keyboardType="decimal-pad"
              width={width - 16}
              showActionButton={false}
            />
          </Animated.View>
        )}
        {step > 2 && (
          <Animated.View style={styles.section} entering={FadeInUp}>
            <Text style={textStyle.header}>{t("header3")}</Text>
            <Text style={textStyle.body}>{t("subtext3")}</Text>
            {category === null ? (
              <Pressable
                onPress={() => {
                  setSheetView("category");
                  sheetRef.current?.snapToIndex(0);
                }}
                style={[styles.button, { backgroundColor: colors.headerBackground }]}
              >
                <Text style={[textStyle.bodyBold, { color: colors.headerText }]}>{t("chooseCategory")}</Text>
              </Pressable>
            ) : (
              <CategoryItem
                item={category}
                onPress={() => {
                  setSheetView("category");
                  sheetRef.current?.snapToIndex(0);
                }}
              />
            )}
          </Animated.View>
        )}
        {step > 3 && (
          <Animated.View style={styles.section} entering={FadeInUp}>
            <Text style={textStyle.header}>{t("header4")}</Text>
            <Text style={textStyle.body}>{t("subtext4")}</Text>
            {group._id === "noGroup" ? (
              <Pressable
                onPress={() => {
                  setSheetView("group");
                  setStep((prev) => (prev === 4 ? 5 : prev));
                  sheetRef.current?.snapToIndex(0);
                }}
                style={[styles.button, { backgroundColor: colors.headerBackground }]}
              >
                <Text style={[textStyle.bodyBold, { color: colors.headerText }]}>{t("chooseGroup")}</Text>
              </Pressable>
            ) : (
              <GroupItem
                item={group}
                onPress={() => {
                  setSheetView("group");
                  sheetRef.current?.snapToIndex(0);
                }}
                style={{ marginVertical: 8 }}
              />
            )}
          </Animated.View>
        )}
        {step > 4 && (
          <Animated.View style={styles.section} entering={FadeInUp}>
            <Text style={textStyle.header}>{t("header5")}</Text>
            <SwipeButton
              style={{ marginTop: 16 }}
              onSwipeComplete={() => setStep(6)}
              bgColor={category !== null ? category.color : "#C5CAE9"}
              text={t("swipeButton")}
            />
          </Animated.View>
        )}
      </ScrollView>
      <View style={[styles.container, {paddingBottom: bottom + 8}]}>
        {step === 6 && <Text style={[textStyle.caption, { marginBottom: 8 }]}>{t("simple2")}</Text>}
        <View style={styles.navBtnContainer}>
          <Link
            href="/(onboarding)/second"
            style={[styles.button, { backgroundColor: colors.headerBackground }]}
            asChild
            dismissTo={true}
          >
            <Pressable>
              <Text style={[textStyle.bodyBold, { color: colors.headerText }]}>{t("back")}</Text>
            </Pressable>
          </Link>
          <Link
            href="/(onboarding)/forth"
            style={[styles.button, { backgroundColor: step === 6 ? colors.headerBackground : "#bdc9e5" }]}
            asChild
          >
            <Pressable disabled={step !== 6}>
              <Text style={[textStyle.bodyBold, { color: step === 6 ? colors.headerText : colors.headerIconDisabled }]}>
                {t("yes")}
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
      <BottomSheet
        style={{ backgroundColor: colors.screen }}
        ref={sheetRef}
        snapPoints={["40%","69%"]}
        enablePanDownToClose
        index={-1}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
        animateOnMount={false}
      >
        {sheetView === "category" && (
          <BottomSheetFlatList
            style={{ backgroundColor: colors.screen }}
            contentContainerStyle={{ paddingBottom: bottom + 8, paddingHorizontal: 16 }}
            data={CATEGORY_DATA}
            renderItem={({ item }) => (
              <CategoryItem item={item} onPress={selectCategory} style={{ marginVertical: 8 }} />
            )}
            ListEmptyComponent={<Text style={textStyle.bodyBold}>{t("noCategoryList")}</Text>}
          />
        )}
        {sheetView === "group" && (
          <BottomSheetFlatList
            style={{ backgroundColor: colors.screen }}
            contentContainerStyle={{ paddingBottom: bottom, paddingHorizontal: 16 }}
            data={GROUP_DATA}
            renderItem={({ item }) => <GroupItem item={item} onPress={selectGroup} style={{ marginVertical: 8 }} />}
          />
        )}
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 8,
  },
  section: {
    marginVertical: 8,
    justifyContent: "flex-start",
    zIndex: 10,
  },
  navBtnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 8,
    marginVertical: 4,
  },
  addBtn: {
    height: 56,
    width: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});

export default ThirdScreen;
