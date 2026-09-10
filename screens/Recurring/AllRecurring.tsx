import React, { useCallback } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { format } from "date-fns";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import Icon from "@components/Icon";
import { useData } from "providers/DataProvider";
import { useHeader } from "providers/HeaderProvider";
import { useSettings } from "providers/SettingsProvider";
import { useTheme } from "providers/ThemeProvider";
import { Subscription } from "types";
import { intervalLabel } from "@utils/subscriptions";

const AllRecurring = () => {
  const router = useRouter();
  const rootNavigation = useNavigation("/");
  const { colors, textStyle } = useTheme();
  const { dateFormat } = useSettings();
  const { headerHeight, tabbarHeight } = useHeader();
  const { subscription, category, updateSubscription, deleteSubscription } = useData();
  const { t } = useTranslation("", { keyPrefix: "app.tabs.recurring" });

  useFocusEffect(
    useCallback(() => {
      rootNavigation.setOptions({
        title: t("title"),
        headerRightBtn: [
          {
            icon: "add",
            onPress: () => router.push("/addRecurring"),
            action: "add_recurring",
            testId: "add-recurring",
          },
        ],
      });
    }, [rootNavigation, router, t])
  );

  const confirmDelete = (item: Subscription) => {
    Alert.alert(t("deleteTitle"), t("deleteText", { name: item.title }), [
      { text: t("cancel"), style: "cancel" },
      { text: t("delete"), style: "destructive", onPress: () => void deleteSubscription(item._id) },
    ]);
  };

  return (
    <FlashList
      estimatedItemSize={126}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 8,
        paddingBottom: tabbarHeight + 8,
        paddingTop: headerHeight + 8,
        backgroundColor: colors.screen,
      }}
      data={subscription.slice().sort((a, b) => {
        if (!a.nextRunAt) return 1;
        if (!b.nextRunAt) return -1;
        return a.nextRunAt.getTime() - b.nextRunAt.getTime();
      })}
      keyExtractor={(item) => item._id}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Icon name="recurringTab" size={48} color={colors.text} />
          <Text style={[textStyle.title, styles.emptyTitle, { color: colors.text }]}>{t("emptyTitle")}</Text>
          <Text style={[textStyle.body, styles.emptyText, { color: colors.text }]}>{t("emptyText")}</Text>
        </View>
      }
      renderItem={({ item }) => {
        const itemCategory = category.find((value) => value._id === item.category);
        const accent = itemCategory?.color ?? colors.sectionBackground;
        const nextRun = item.nextRunAt ? format(item.nextRunAt, dateFormat) : t("completed");
        const amountColor =
          itemCategory?.type === "income"
            ? colors.income
            : itemCategory?.type === "transfer"
              ? colors.transfer
              : colors.expense;

        return (
          <View style={[styles.card, { backgroundColor: colors.sectionBackground, borderLeftColor: accent }]}>
            <View style={styles.cardHeader}>
              <View style={styles.cardTitle}>
                <Text style={[textStyle.title, { color: colors.text }]} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={[textStyle.label, { color: colors.text }]}>
                  {intervalLabel(item.intervalUnit, item.intervalCount)}
                </Text>
              </View>
              <Text style={[textStyle.amount, { color: amountColor }]}>
                {item.currency} {item.amount}
              </Text>
            </View>
            <Text style={[textStyle.body, styles.nextRun, { color: colors.text }]}>
              {item.isActive ? t("next", { date: nextRun }) : item.nextRunAt ? t("paused") : t("completed")}
            </Text>
            <View style={styles.actions}>
              {item.nextRunAt && (
                <Pressable
                  accessibilityRole="button"
                  onPress={() => void updateSubscription(item._id, { isActive: !item.isActive })}
                  style={[styles.actionButton, { borderColor: colors.text }]}
                >
                  <Text style={[textStyle.label, { color: colors.text }]}>
                    {item.isActive ? t("pause") : t("resume")}
                  </Text>
                </Pressable>
              )}
              <Pressable
                accessibilityRole="button"
                onPress={() => confirmDelete(item)}
                style={[styles.actionButton, { borderColor: colors.expense }]}
              >
                <Text style={[textStyle.label, { color: colors.expense }]}>{t("delete")}</Text>
              </Pressable>
            </View>
          </View>
        );
      }}
    />
  );
};

export default AllRecurring;

const styles = StyleSheet.create({
  card: { borderRadius: 8, borderLeftWidth: 6, padding: 16, marginVertical: 6 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  cardTitle: { flex: 1, gap: 4 },
  nextRun: { marginTop: 12 },
  actions: { flexDirection: "row", justifyContent: "flex-end", gap: 8, marginTop: 12 },
  actionButton: {
    minHeight: 38,
    minWidth: 76,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  emptyState: { minHeight: 280, paddingHorizontal: 28, alignItems: "center", justifyContent: "center" },
  emptyTitle: { marginTop: 16, textAlign: "center" },
  emptyText: { marginTop: 8, textAlign: "center" },
});
