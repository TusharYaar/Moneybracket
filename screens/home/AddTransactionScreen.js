import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Radio,
  RadioGroup,
  Text,
  Input,
  Datepicker,
  Select,
  SelectItem,
} from '@ui-kitten/components';
import TranslateText from '../../components/TranslateText';

import avalibleExchangeRates from '../../data/exchangeRates';

const AddTransactionScreen = () => {
  const [transactionType, setTransactionType] = useState(0);
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [transactionAmount, setTransactionAmount] = useState('');

  const handleTransactionAmount = value => {
    setTransactionAmount(value.replace(/([^0-9.])/g, ''));
  };

  return (
    <View style={styles.screen}>
      <View>
        <RadioGroup
          style={styles.radioGroup}
          selectedIndex={transactionType}
          onChange={value => setTransactionType(value)}>
          <Radio style={styles.radio}>Income</Radio>
          <Radio style={styles.radio}>Expense</Radio>
        </RadioGroup>
      </View>
      <View>
        <Datepicker
          label="Date"
          caption="Choose the transaction date"
          placeholder="Pick A Date"
          date={transactionDate}
          onSelect={nextDate => setTransactionDate(nextDate)}
        />
      </View>
      <Select>
        {avalibleExchangeRates.map(rate => (
          <SelectItem key={rate.code} title={rate.symbol} />
        ))}
      </Select>
      <Input
        placeholder="Transaction Amount"
        value={transactionAmount}
        onChangeText={handleTransactionAmount}
        keyboardType="decimal-pad"
      />
    </View>
  );
};

export default AddTransactionScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 15,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
