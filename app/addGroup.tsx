import { Text, View, TextInput, Pressable, useWindowDimensions, ScrollView } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GROUP_COLORS } from "data";
import SwipeButton from "@components/SwipeButton";
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import PrimaryInput from "@components/AmountInput";
import { useData } from "providers/DataProvider";
import { useTheme } from "providers/ThemeProvider";
import Icon from "@components/Icon";
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import DeleteContainer from "@components/DeleteContainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeader } from "providers/HeaderProvider";

type ValueProps = {
  title: string;
  color: string;
  icon: string;
  description: string;
};

type SearchParams = {
  _id: string;
  color: string;
  title: string;
};
const AddGroupScreen = () => {
  const { addGroup, updateGroup, deleteGroup, group } = useData();
  const { _id = null, color, title = "" } = useLocalSearchParams<SearchParams>();
  const { t } = useTranslation("", { keyPrefix: "app.addGroup" });
  const router = useRouter();;
  const inputRef = useRef<TextInput>(null);
  const { textStyle, colors } = useTheme();
  const [values, setValues] = useState<ValueProps>({
    title,
    color: color ? color : colors.screen,
    icon: "icon_6",
    description: "",
  });
  const [sheetView, setSheetView] = useState<"icon" | "delete">("icon");

  const { height, width } = useWindowDimensions();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const sheetRef = useRef<BottomSheet>(null);
  const { headerHeight } = useHeader();
  const navigation = useNavigation();
  
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({ title: _id ? t("updateTitle") : t("addTitle"), headerRightBtn: _id ? [{ icon: "delete", onPress: showDeleteModal, action: "delete_group" }] : [] });
    }, [_id])
  );

  useEffect(() => {
    if (_id) {
      const grup = group.find((grp) => grp._id === _id);
      if (grup) {
        setValues((prev) => ({ ...prev, description: grup.description, icon: grup.icon }));
      }
    }
  }, [_id, group]);

  const recommendColor = useMemo(() => {
    if (_id) {
      return "";
    } else {
      const color = GROUP_COLORS[(Math.random() * GROUP_COLORS.length).toFixed()];
      setValues((prev) => ({ ...prev, color }));
      return color;
    }
  }, [_id, setValues]);

  const numCol = useMemo(() => Math.floor(width / 100), [width]);

  const handleSelectIcon = useCallback(
    (icon: string) => {
      setValues((prev) => ({ ...prev, icon }));
      sheetRef.current?.close();
    },
    [sheetRef]
  );

  const handleSubmit = () => {
    const date = new Date();
    // TODO: ADD Check
    if (_id) {
      // TODO: fetch created_at date and populate here
      updateGroup(_id, { ...values, createdAt: date, updatedAt: date, isFavorite: false });
    } else addGroup({ ...values, createdAt: date, updatedAt: date, isFavorite: false });
    if (router.canGoBack()) router.back();
    else router.replace("(tabs)/group");
  };
  const handlePressDelete = useCallback(() => {
    sheetRef.current?.close();
    if (_id !== null) deleteGroup(_id);
    router.back();
  }, [_id]);

  const showDeleteModal = useCallback(() => {
    setSheetView("delete");
    sheetRef.current?.snapToIndex(0);
  }, [sheetRef, setSheetView]);

  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 8, paddingTop: headerHeight + 8, paddingBottom: bottomInset + 8, flex: 1 }}
        style={{ backgroundColor: colors.screen, flexGrow: 1, minHeight: height }}
      >
        <View style={{ flex: 1 }}>
          <PrimaryInput
            autofocus={_id ? false : true}
            onPress={() => {}}
            ref={inputRef}
            backgroundColor={values.color}
            initialValue={title}
            onChangeText={(title) => setValues((prev) => ({ ...prev, title }))}
          />
          <View style={{ flexDirection: "row", justifyContent: "space-between", columnGap: 16, marginTop: 24 }}>
            <View>
              <Text style={textStyle.body}>{t("icon")}</Text>
              <Pressable
                onPress={() => {
                  setSheetView("icon");
                  sheetRef.current?.snapToIndex(0);
                }}
              >
                <View
                  style={{
                    borderRadius: 4,
                    height: 64,
                    width: 64,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: values.color,
                  }}
                >
                  <Icon name={values.icon} size={48} />
                </View>
              </Pressable>
            </View>
            <View>
              <Text style={textStyle.body}>{t("color")}</Text>
              <ScrollView
                contentContainerStyle={{ flexDirection: "row", columnGap: 8, paddingRight: 16 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ width: width - 64 - 16 - 16 }}
              >
                {GROUP_COLORS.map((color) => (
                  <Pressable key={color} onPress={() => setValues((prev) => ({ ...prev, color }))}>
                    <View style={{ backgroundColor: color, borderRadius: 4, height: 64, width: 64 }} />
                    {values.color === color && (
                      <Animated.Text
                        exiting={FadeOutUp}
                        entering={FadeInUp}
                        style={[textStyle.label, { textAlign: "center" }]}
                      >
                        {t("current")}
                      </Animated.Text>
                    )}
                    {values.color !== color && recommendColor === color && (
                      <Animated.Text
                        exiting={FadeOutUp}
                        entering={FadeInUp}
                        style={[textStyle.label, { textAlign: "center" }]}
                      >
                        {t("suggested")}
                      </Animated.Text>
                    )}
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
          <View style={{ marginTop: 24 }}>
            <Text style={textStyle.body}>{t("description")}</Text>
            <TextInput
              value={values.description}
              numberOfLines={3}
              multiline
              onChangeText={(description) => setValues((prev) => ({ ...prev, description }))}
              style={[
                textStyle.body,
                { borderRadius: 4, borderWidth: 2, borderColor: values.color, minHeight: 78, textAlignVertical: "top" },
              ]}
            />
          </View>
        </View>

        <SwipeButton
          bgColor={values.color}
          onSwipeComplete={handleSubmit}
          style={{ marginTop: 24 }}
          text={_id ? t("swipeButtonUpdate") : t("swipeButtonAdd")}
        />
      </ScrollView>

      <BottomSheet
        ref={sheetRef}
        snapPoints={[225, "69%", "100%"]}
        index={-1}
        backdropComponent={renderBackdrop}
        style={{ backgroundColor: colors.screen }}
        enableHandlePanningGesture={sheetView === "icon"}
      >
        {sheetView === "icon" && (
          <BottomSheetFlatList
            numColumns={numCol}
            key={`icon_flatlist_${numCol}`}
            style={{ backgroundColor: colors.screen }}
            contentContainerStyle={{ padding: 16 }}
            columnWrapperStyle={{ flex: 1, justifyContent: "space-around", margin: 8 }}
            data={Array(99)
              .fill(1)
              .map((_, index) => `icon_${index}`)}
            renderItem={({ item }) => (
              <Pressable key={item} onPress={() => handleSelectIcon(item)}>
                <View
                  style={{
                    borderRadius: 4,
                    height: 64,
                    width: 64,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: values.icon === item ? values.color : undefined,
                    borderColor: values.icon === item ? undefined : values.color,
                  }}
                >
                  <Icon name={item} size={48} color={values.icon === item ? colors.text : values.color} />
                </View>
              </Pressable>
            )}
          />
        )}
        {sheetView === "delete" && (
          <DeleteContainer
            text={t("deleteText")}
            title={t("deleteTitle")}
            onComfirm={handlePressDelete}
            onCancel={() => sheetRef.current?.close()}
            cancel={t("cancel")}
            color={values.color}
            confirm={t("confirm")}
          />
        )}
      </BottomSheet>
    </>
  );
};

export default AddGroupScreen;
