import {ScrollView, StyleSheet, View} from "react-native";
import React, {useCallback, useMemo, useState} from "react";
import {useData} from "../../providers/DataProvider";
import {PieChart} from "react-native-chart-kit";

import {Dimensions} from "react-native";
import {List, Surface, Title} from "react-native-paper";

import Icon from "react-native-vector-icons/Ionicons";

import CategoryChip from "../../components/CategoryChip";
import {Category} from "../../realm/Category";

const Charts = () => {
  const {transaction, category} = useData();
  const [selected, setSelected] = useState(
    category.map(cat => cat._id.toHexString()),
  );

  const updateSelectedCategory = useCallback((cat: Category) => {
    let id = cat._id.toHexString();
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(_cat => _cat !== id);
      else return [...prev, id];
    });
  }, []);

  const aggregatedValues = useMemo(() => {
    let obj: {
      [key: string]: number;
    } = {};

    category.forEach(cat => {
      obj[cat._id.toHexString()] = 0;
    });

    transaction.forEach(trans => {
      obj[trans.category._id.toHexString()] += trans.amount;
    });
    return obj;
  }, [transaction, category]);

  const pieData = useMemo(() => {
    return category
      .filter(cat => selected.includes(cat._id.toHexString()))
      .map(cat => ({
        name: cat.title,
        color: cat.color,
        amount: aggregatedValues[cat._id.toHexString()],
      }));
  }, [transaction, category, selected, aggregatedValues]);

  return (
    <>
      <List.Section style={{padding: 0, margin: 0}}>
        <List.Accordion
          title={`${selected.length} Categories Selected`}
          style={{padding: 0, margin: 0}}
          right={({isExpanded}) => (
            <Icon name={isExpanded ? "chevron-up" : "chevron-down"} size={20} />
          )}
        >
          <View style={styles.chipContainer}>
            {category.map(cat => (
              <CategoryChip
                category={cat}
                key={cat._id.toHexString()}
                onPress={updateSelectedCategory}
                selected={selected.includes(cat._id.toHexString())}
                style={styles.chip}
              />
            ))}
          </View>
        </List.Accordion>
      </List.Section>
      <ScrollView>
        <PieChart
          hasLegend={false}
          data={pieData}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          width={Dimensions.get("window").width}
          height={Dimensions.get("window").width}
          paddingLeft={`${Dimensions.get("window").width / 4}`}
          accessor="amount"
          backgroundColor="transparent"
        />
      </ScrollView>
    </>
  );
};

export default Charts;

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    margin: 3,
  },
});
