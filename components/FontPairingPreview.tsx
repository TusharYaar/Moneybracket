import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "providers/ThemeProvider";

/**
 * Component to preview font pairings
 * Shows how text and numbers look together with the selected font
 */
const FontPairingPreview: React.FC = () => {
  const { textStyle, colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.screen }]}>
      <View style={styles.section}>
        <Text style={[textStyle.title, { marginBottom: 16 }]}>Font Pairing Preview</Text>
        
        {/* Display Style */}
        <View style={styles.previewCard}>
          <Text style={[textStyle.label, { color: colors.text, opacity: 0.6, marginBottom: 4 }]}>
            Display (Large Numbers)
          </Text>
          <Text style={textStyle.display}>$12,345.67</Text>
        </View>

        {/* Amount Input Style */}
        <View style={styles.previewCard}>
          <Text style={[textStyle.label, { color: colors.text, opacity: 0.6, marginBottom: 4 }]}>
            Amount Input
          </Text>
          <Text style={textStyle.amountInput}>$1,234.56</Text>
        </View>

        {/* Amount Style */}
        <View style={styles.previewCard}>
          <Text style={[textStyle.label, { color: colors.text, opacity: 0.6, marginBottom: 4 }]}>
            Amount (Transaction List)
          </Text>
          <Text style={textStyle.amount}>$987.65</Text>
        </View>

        {/* Header Style */}
        <View style={styles.previewCard}>
          <Text style={[textStyle.label, { color: colors.text, opacity: 0.6, marginBottom: 4 }]}>
            Header
          </Text>
          <Text style={textStyle.header}>Monthly Budget</Text>
        </View>

        {/* Title Style */}
        <View style={styles.previewCard}>
          <Text style={[textStyle.label, { color: colors.text, opacity: 0.6, marginBottom: 4 }]}>
            Title
          </Text>
          <Text style={textStyle.title}>Groceries & Food</Text>
        </View>

        {/* Body Style */}
        <View style={styles.previewCard}>
          <Text style={[textStyle.label, { color: colors.text, opacity: 0.6, marginBottom: 4 }]}>
            Body Text
          </Text>
          <Text style={textStyle.body}>
            This is regular body text. It should be easy to read and comfortable for longer paragraphs.
            The quick brown fox jumps over the lazy dog.
          </Text>
        </View>

        {/* Body Bold Style */}
        <View style={styles.previewCard}>
          <Text style={[textStyle.label, { color: colors.text, opacity: 0.6, marginBottom: 4 }]}>
            Body Bold
          </Text>
          <Text style={textStyle.bodyBold}>
            This is bold body text for emphasis. Important information stands out clearly.
          </Text>
        </View>

        {/* Caption Style */}
        <View style={styles.previewCard}>
          <Text style={[textStyle.label, { color: colors.text, opacity: 0.6, marginBottom: 4 }]}>
            Caption
          </Text>
          <Text style={textStyle.caption}>$5,432.10</Text>
        </View>

        {/* Label Style */}
        <View style={styles.previewCard}>
          <Text style={[textStyle.label, { color: colors.text, opacity: 0.6, marginBottom: 4 }]}>
            Label
          </Text>
          <Text style={textStyle.label}>Category Name</Text>
        </View>

        {/* Combined Example - Transaction List */}
        <View style={[styles.previewCard, { backgroundColor: colors.sectionBackground }]}>
          <Text style={[textStyle.bodyBold, { marginBottom: 12 }]}>Transaction List Example</Text>
          
          <View style={styles.transactionRow}>
            <View style={{ flex: 1 }}>
              <Text style={textStyle.body}>Coffee Shop</Text>
              <Text style={[textStyle.label, { opacity: 0.6 }]}>Food & Dining</Text>
            </View>
            <Text style={[textStyle.amount, { color: colors.expense }]}>-$4.50</Text>
          </View>

          <View style={styles.transactionRow}>
            <View style={{ flex: 1 }}>
              <Text style={textStyle.body}>Salary Deposit</Text>
              <Text style={[textStyle.label, { opacity: 0.6 }]}>Income</Text>
            </View>
            <Text style={[textStyle.amount, { color: colors.income }]}>+$3,500.00</Text>
          </View>

          <View style={styles.transactionRow}>
            <View style={{ flex: 1 }}>
              <Text style={textStyle.body}>Grocery Store</Text>
              <Text style={[textStyle.label, { opacity: 0.6 }]}>Food & Dining</Text>
            </View>
            <Text style={[textStyle.amount, { color: colors.expense }]}>-$127.89</Text>
          </View>
        </View>

        {/* Number Comparison */}
        <View style={styles.previewCard}>
          <Text style={[textStyle.bodyBold, { marginBottom: 12 }]}>Number Alignment Test</Text>
          <Text style={[textStyle.label, { opacity: 0.6, marginBottom: 8 }]}>
            Monospace fonts keep numbers aligned:
          </Text>
          <View style={styles.numberList}>
            <Text style={textStyle.amount}>$1,111.11</Text>
            <Text style={textStyle.amount}>$2,222.22</Text>
            <Text style={textStyle.amount}>$3,333.33</Text>
            <Text style={textStyle.amount}>$4,444.44</Text>
            <Text style={textStyle.amount}>$5,555.55</Text>
          </View>
        </View>

        {/* All Digits */}
        <View style={styles.previewCard}>
          <Text style={[textStyle.bodyBold, { marginBottom: 12 }]}>All Digits Preview</Text>
          <Text style={textStyle.amount}>0123456789</Text>
          <Text style={textStyle.amount}>$1,234,567.89</Text>
          <Text style={textStyle.amount}>-$9,876.54</Text>
          <Text style={textStyle.amount}>+$10,000.00</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  previewCard: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
  },
  numberList: {
    gap: 4,
  },
});

export default FontPairingPreview;
