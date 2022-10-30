import {StyleSheet, View} from "react-native";
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

type Props = NativeStackScreenProps<StackParamList, "AddCategoryScreen">;

const AddCategory = ({navigation}: Props) => {
  const [title, setTitle] = useState("Paisa hi Paise");
  const [type, setType] = useState("income");
  const realm = useRealm();

  const addNewCategory = useCallback(
    (categoryTitle: string, categoryType: string) => {
      realm.write(() => {
        realm.create(
          "Category",
          Category.generate(categoryTitle, categoryType),
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
      <Button onPress={() => addNewCategory(title, type)}>Add Category</Button>
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
