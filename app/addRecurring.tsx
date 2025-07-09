import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "providers/ThemeProvider";
import { useTranslation } from "react-i18next";

const AddRecurring = () => {
    const router = useRouter();
    const { colors, textStyle } = useTheme();
    const { t } = useTranslation("", { keyPrefix: "app.addRecurring" });

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    const handleSave = () => {
        if (!title.trim() || !amount.trim()) {
            Alert.alert(t("error"), t("pleaseFillRequiredFields"));
            return;
        }

        // TODO: Add recurring transaction logic here
        console.log("Saving recurring transaction:", { title, amount, description });

        // Navigate back after saving
        router.back();
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.screen }]}>
            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={[textStyle.label, { color: colors.text }]}>
                        {t("title")} *
                    </Text>
                    <TextInput

                        value={title}
                        onChangeText={setTitle}
                        placeholder={t("enterTitle")}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={[textStyle.label, { color: colors.text }]}>
                        {t("amount")} *
                    </Text>
                    <TextInput
                        value={amount}
                        onChangeText={setAmount}
                        placeholder={t("enterAmount")}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={[textStyle.label, { color: colors.text }]}>
                        {t("description")}
                    </Text>
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder={t("enterDescription")}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={handleCancel}
                >
                    <Text style={[{ color: colors.text }]}>
                        {t("cancel")}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.saveButton]}
                    onPress={handleSave}
                >
                    <Text>
                        {t("save")}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddRecurring;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    form: {
        flex: 1,
    },
    inputGroup: {
        marginBottom: 20,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginTop: 8,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginTop: 8,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 12,
        marginTop: 20,
    },
    button: {
        flex: 1,
        height: 48,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
    },
    cancelButton: {
        backgroundColor: "transparent",
    },
    saveButton: {
        borderWidth: 0,
    },
});
