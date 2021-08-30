import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Radio,
  RadioGroup,
  Button,
  Text,
  Input,
  Datepicker,
  Select,
  IndexPath,
  SelectItem,
} from '@ui-kitten/components';

import ImageIcon from '../../components/ImageIcon';

import TranslateText from '../../components/TranslateText';
import {useSelector} from 'react-redux';

import {insertTransactions} from '../../helpers/dbFunctions';

const AddTransactionScreen = ({navigation}) => {
  const currency = useSelector(state => state.settings.currency);
  const categories = useSelector(state => state.categories.categories);
  const avalibleExchangeRates = useSelector(state => state.exchangeRates.rates);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [categoryIndex, setCategoryIndex] = useState(new IndexPath(0));
  const [transactionType, setTransactionType] = useState(0);
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionNote, setTransactionNote] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(
    avalibleExchangeRates.find(item => item.code === currency.base),
  );
  const [selectedIndex, setSelectedIndex] = useState(
    new IndexPath(
      avalibleExchangeRates.findIndex(item => item.code === currency.base),
    ),
  );

  const handleTransactionAmount = value => {
    setTransactionAmount(value.replace(/([^0-9.])/g, ''));
  };
  const handleChangeCurrency = index => {
    const item = avalibleExchangeRates[index.row];
    setSelectedCurrency(item);
    setSelectedIndex(index);
  };
  const handleChangeCategory = index => {
    const item = categories[index.row];
    setSelectedCategory(item);
    setCategoryIndex(index);
  };

  const handleSubmit = async () => {
    try {
      var transactionObject = {
        base_currency: currency.base,
        transaction_currency: selectedCurrency.code,
        transaction_type: transactionType === 0 ? 'income' : 'expense',
        conversion_rate: selectedCurrency.rate,
        transaction_amount:
          (1 / selectedCurrency.rate) * parseInt(transactionAmount),
        transaction_date: transactionDate.toISOString(),
        created_on: new Date().toISOString(),
        note: transactionNote,
        category: selectedCategory.category,
      };
      await insertTransactions(transactionObject);
      navigation.pop();
    } catch (err) {
      console.error(err.message);
    }
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
          placeholder="Pick A Date"
          date={transactionDate}
          onSelect={nextDate => setTransactionDate(nextDate)}
        />
      </View>
      <View style={styles.addAmountContainer}>
        <Select
          onSelect={handleChangeCurrency}
          selectedIndex={selectedIndex}
          value={selectedCurrency.symbol}
          style={styles.symbolSelect}>
          {avalibleExchangeRates.map(rate => (
            <SelectItem
              key={rate.code}
              title={`${rate.symbol} (${rate.code})`}
              accessoryLeft={<ImageIcon uri={rate.flag} />}
            />
          ))}
        </Select>
        <View style={styles.seperator} />
        <Input
          placeholder="Transaction Amount"
          style={styles.amount}
          caption={
            selectedCurrency.code != currency.base && transactionAmount.length
              ? `${currency.symbol} ${(
                  (1 / selectedCurrency.rate) *
                  parseInt(transactionAmount)
                ).toFixed(2)}`
              : null
          }
          value={transactionAmount}
          onChangeText={handleTransactionAmount}
          keyboardType="decimal-pad"
        />
      </View>
      <Input
        placeholder="Note"
        label="Note"
        multiline
        value={transactionNote}
        onChangeText={text => setTransactionNote(text)}
      />
      <Select
        onSelect={handleChangeCategory}
        selectedIndex={categoryIndex}
        style={styles.categorySelect}
        label="Category"
        value={selectedCategory.category}>
        {categories.map(category => (
          <SelectItem
            key={category.category}
            title={category.category}
            accessoryLeft={<ImageIcon uri={category.imageUri} />}
          />
        ))}
      </Select>
      <Button onPress={handleSubmit} disabled={!transactionAmount > 0}>
        {' '}
        Add Transaction
      </Button>
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
  addAmountContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'center',
  },
  symbolSelect: {
    width: '30%',
    maxWidth: 150,
    minWidth: 110,
  },
  seperator: {
    width: 15,
  },
  amount: {
    flexGrow: 1,
  },
  categorySelect: {
    marginVertical: 15,
  },
});
