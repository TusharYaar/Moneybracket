import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { format, startOfDay } from "date-fns";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import CategoryItem from "@components/CategoryItem";
import GroupItem from "@components/GroupItem";
import SwipeButton from "@components/SwipeButton";
import { useData } from "providers/DataProvider";
import { useHeader } from "providers/HeaderProvider";
import { useSettings } from "providers/SettingsProvider";
import { useTheme } from "providers/ThemeProvider";
import { SubscriptionInterval } from "types";

const INTERVALS: SubscriptionInterval[] = ["day", "week", "month", "year"];

const AddRecurring = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { colors, textStyle } = useTheme();
  const { currency, dateFormat } = useSettings();
  const { category, group, addSubscription } = useData();
  const { headerHeight } = useHeader();
  const { bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { t } = useTranslation("", { keyPrefix: "app.addRecurring" });

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(category[0]?._id ?? "");
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [intervalUnit, setIntervalUnit] = useState<SubscriptionInterval>("month");
  const [intervalCount, setIntervalCount] = useState("1");
  const [startDate, setStartDate] = useState(startOfDay(new Date()));
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [datePicker, setDatePicker] = useState<"start" | "end" | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!selectedCategoryId && category[0]) setSelectedCategoryId(category[0]._id);
  }, [category, selectedCategoryId]);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({ title: t("title") });
    }, [navigation, t])
  );

  const selectedCategory = useMemo(
    () => category.find((item) => item._id === selectedCategoryId),
    [category, selectedCategoryId]
  );

  const parsedAmount = Number(amount);
  const parsedInterval = Number.parseInt(intervalCount, 10);
  const canSave =
    !saving &&
    title.trim().length > 0 &&
    Number.isFinite(parsedAmount) &&
    parsedAmount > 0 &&
    Number.isInteger(parsedInterval) &&
    parsedInterval > 0 &&
    Boolean(selectedCategory);

  const handleDateChange = (_event: DateTimePickerEvent, value?: Date) => {
    if (!value) {
      setDatePicker(null);
      return;
    }

    if (datePicker === "start") {
      const normalizedDate = startOfDay(value);
      setStartDate(normalizedDate);
      if (endDate && endDate.getTime() < normalizedDate.getTime()) setEndDate(null);
    } else if (datePicker === "end") {
      setEndDate(startOfDay(value));
    }
    setDatePicker(null);
  };

  const handleSave = async () => {
    if (!canSave || !selectedCategory) {
      Alert.alert(t("errorTitle"), t("requiredFields"));
      return;
    }

    setSaving(true);
    try {
      await addSubscription({
        title: title.trim(),
        note: note.trim(),
        amount: parsedAmount,
        currency: currency.code,
        category: selectedCategory._id,
        conversionRate: 1,
        conversionCurrency: "",
        group: selectedGroupId,
        startDate,
        intervalUnit,
        intervalCount: parsedInterval,
        endDate,
        isActive: true,
      });
      router.back();
    } catch {
      Alert.alert(t("errorTitle"), t("saveError"));
      setSaving(false);
    }
  };

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.content,
          {
            minHeight: height,
            paddingTop: headerHeight + 16,
            paddingBottom: bottom + 16,
            backgroundColor: colors.screen,
          },
        ]}
      >
        <Text style={[textStyle.body, { color: colors.text }]}>{t("name")}</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder={t("namePlaceholder")}
          placeholderTextColor={`${colors.text}88`}
          style={[styles.input, textStyle.body, { color: colors.text, borderColor: colors.text }]}
        />

        <Text style={[styles.label, textStyle.body, { color: colors.text }]}>{t("amount")}</Text>
        <View style={[styles.amountRow, { borderColor: selectedCategory?.color ?? colors.text }]}>
          <Text style={[textStyle.title, { color: colors.text }]}>{currency.symbol_native}</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="0"
            placeholderTextColor={`${colors.text}88`}
            keyboardType="decimal-pad"
            style={[styles.amountInput, textStyle.amount, { color: colors.text }]}
          />
          <Text style={[textStyle.body, { color: colors.text }]}>{currency.code}</Text>
        </View>

        <Text style={[styles.label, textStyle.body, { color: colors.text }]}>{t("category")}</Text>
        {category.length === 0 ? (
          <Text style={[textStyle.body, { color: colors.text }]}>{t("noCategories")}</Text>
        ) : (
          category.map((item) => (
            <CategoryItem
              key={item._id}
              item={item}
              onPress={() => setSelectedCategoryId(item._id)}
              style={[
                styles.optionItem,
                item._id === selectedCategoryId ? { borderWidth: 3, borderColor: item.color } : undefined,
              ]}
            />
          ))
        )}

        <Text style={[styles.label, textStyle.body, { color: colors.text }]}>{t("group")}</Text>
        <Pressable
          onPress={() => setSelectedGroupId(null)}
          style={[
            styles.noneButton,
            { borderColor: colors.text },
            selectedGroupId === null && { backgroundColor: colors.sectionBackground },
          ]}
        >
          <Text style={[textStyle.body, { color: colors.text }]}>{t("noGroup")}</Text>
        </Pressable>
        {group.map((item) => (
          <GroupItem
            key={item._id}
            item={item}
            onPress={() => setSelectedGroupId(item._id)}
            style={[
              styles.optionItem,
              item._id === selectedGroupId ? { borderWidth: 3, borderColor: item.color } : undefined,
            ]}
          />
        ))}

        <Text style={[styles.label, textStyle.body, { color: colors.text }]}>{t("repeat")}</Text>
        <View style={styles.intervalRow}>
          <TextInput
            value={intervalCount}
            onChangeText={setIntervalCount}
            keyboardType="number-pad"
            style={[styles.countInput, textStyle.body, { color: colors.text, borderColor: colors.text }]}
          />
          <View style={styles.unitRow}>
            {INTERVALS.map((unit) => (
              <Pressable
                key={unit}
                onPress={() => setIntervalUnit(unit)}
                style={[
                  styles.unitButton,
                  { borderColor: selectedCategory?.color ?? colors.text },
                  intervalUnit === unit && { backgroundColor: selectedCategory?.color ?? colors.sectionBackground },
                ]}
              >
                <Text style={[textStyle.label, { color: colors.text }]}>{t(`intervals.${unit}`)}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Text style={[styles.label, textStyle.body, { color: colors.text }]}>{t("startDate")}</Text>
        <Pressable
          onPress={() => setDatePicker("start")}
          style={[styles.dateButton, { borderColor: selectedCategory?.color ?? colors.text }]}
        >
          <Text style={[textStyle.title, { color: colors.text }]}>{format(startDate, dateFormat)}</Text>
        </Pressable>

        <View style={styles.endDateHeader}>
          <Text style={[textStyle.body, { color: colors.text }]}>{t("endDate")}</Text>
          {endDate && (
            <Pressable onPress={() => setEndDate(null)}>
              <Text style={[textStyle.label, { color: colors.expense }]}>{t("clear")}</Text>
            </Pressable>
          )}
        </View>
        <Pressable
          onPress={() => setDatePicker("end")}
          style={[styles.dateButton, { borderColor: selectedCategory?.color ?? colors.text }]}
        >
          <Text style={[textStyle.title, { color: colors.text }]}>
            {endDate ? format(endDate, dateFormat) : t("noEndDate")}
          </Text>
        </Pressable>

        <Text style={[styles.label, textStyle.body, { color: colors.text }]}>{t("note")}</Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder={t("notePlaceholder")}
          placeholderTextColor={`${colors.text}88`}
          multiline
          textAlignVertical="top"
          style={[styles.input, styles.noteInput, textStyle.body, { color: colors.text, borderColor: colors.text }]}
        />

        <SwipeButton
          style={styles.saveButton}
          onSwipeComplete={handleSave}
          disable={!canSave}
          bgColor={selectedCategory?.color}
          text={saving ? t("saving") : t("save")}
        />
      </ScrollView>

      {datePicker && (
        <DateTimePicker
          value={datePicker === "start" ? startDate : endDate ?? startDate}
          mode="date"
          minimumDate={datePicker === "end" ? startDate : undefined}
          onChange={handleDateChange}
        />
      )}
    </>
  );
};

export default AddRecurring;

const styles = StyleSheet.create({
  content: { flexGrow: 1, paddingHorizontal: 16 },
  label: { marginTop: 20 },
  input: { minHeight: 48, borderWidth: 2, borderRadius: 8, paddingHorizontal: 12, marginTop: 8 },
  noteInput: { minHeight: 96, paddingTop: 12 },
  amountRow: {
    minHeight: 64,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  amountInput: { flex: 1, paddingHorizontal: 8 },
  optionItem: { marginTop: 8 },
  noneButton: {
    minHeight: 48,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 8,
    justifyContent: "center",
  },
  intervalRow: { flexDirection: "row", alignItems: "stretch", gap: 8, marginTop: 8 },
  countInput: { width: 56, borderWidth: 2, borderRadius: 8, textAlign: "center" },
  unitRow: { flex: 1, flexDirection: "row", flexWrap: "wrap", gap: 8 },
  unitButton: {
    minHeight: 40,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  dateButton: {
    minHeight: 56,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  endDateHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 },
  saveButton: { marginTop: 28 },
});
