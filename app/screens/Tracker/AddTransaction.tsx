import {Text, View} from "react-native";
import React, {useState} from "react";

import {Paragraph, TextInput, Button} from "react-native-paper";
// import {useData} from "../../providers/DataProvider";

const AddTransaction = () => {
  const [amount, setAmount] = useState("100");
  const [description, setDescription] = useState("");

  // const {category} = useData();

  return (
    <View>
      <Text>AddTransaction</Text>
      <Paragraph>Amount</Paragraph>
      <TextInput
        value={`${amount}`}
        onChangeText={text => {
          setAmount(text);
        }}
        keyboardType="decimal-pad"
      />
      <TextInput
        value={description}
        onChangeText={text => {
          setDescription(text);
        }}
      />
      <Button>Add Expense</Button>
    </View>
  );
};

export default AddTransaction;
