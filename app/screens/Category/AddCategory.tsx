import {FlatList, StyleSheet, View} from "react-native";
import React, {useState, useCallback} from "react";
import {
  Caption,
  TextInput,
  RadioButton,
  Subheading,
  Button,
} from "react-native-paper";
import {useRealm} from "../../realm";
import {Category} from "../../realm/Category";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackParamList} from "../../navigators/StackNavigators";

import ColorChoice from "../../components/ColorChoice";

type Props = NativeStackScreenProps<StackParamList, "AddCategoryScreen">;

const COLOR_OPTIONS = [
  "#d5001a",
  "#ff6a00",
  "#ffb507",
  "#ffd972",
  "#fff5da",
  "#f2f8d7",
  "#b2ddcc",
  "#42b3d5",
  "#27539b",
  "#182276",
];

const AddCategory = ({navigation}: Props) => {
  const [title, setTitle] = useState("Paisa hi Paise");
  const [type, setType] = useState("income");
  const [color, setColor] = useState(COLOR_OPTIONS[0]);
  const realm = useRealm();

  const addNewCategory = useCallback(
    (categoryTitle: string, categoryType: string, categoryColor: string) => {
      realm.write(() => {
        realm.create(
          "Category",
          Category.generate(categoryTitle, categoryType, categoryColor),
        );
        navigation.goBack();
      });
    },
    [realm, navigation],
  );

  return (
    <View style={styles.screen}>
      <Subheading>Title</Subheading>
      <TextInput value={title} onChangeText={text => setTitle(text)} />
      <RadioButton.Group value={type} onValueChange={value => setType(value)}>
        <>
          <Caption>Income</Caption>
          <RadioButton value="income" />
        </>
        <>
          <Caption>Expense</Caption>
          <RadioButton value="expense" />
        </>
      </RadioButton.Group>
      <FlatList
        horizontal={true}
        data={COLOR_OPTIONS}
        renderItem={({item}) => (
          <ColorChoice
            key={item}
            color={item}
            onPress={() => setColor(item)}
            selected={color === item}
          />
        )}
      />
      {/* <ScrollView horizontal={true}>
        {COLOR_OPTIONS.map(col => (
          
        ))}
      </ScrollView> */}
      <Button onPress={() => addNewCategory(title, type, color)}>
        Add Category
      </Button>
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
});
