import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Radio,
  RadioGroup,
  Text,
  Input,
  Datepicker,
  Select,
  IndexPath,
  SelectItem,
} from '@ui-kitten/components';
import TranslateText from '../../components/TranslateText';
import {useSelector} from 'react-redux';
import {fetchCategories} from '../../helpers/sqlFunctions';
const AddTransactionScreen = () => {
  const currency = useSelector(state => state.settings.currency);
  const avalibleExchangeRates = useSelector(state => state.exchangeRates.rates);
  const [avalibleCategories, setAvalibleCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(new IndexPath(0));
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

  useEffect(() => {
    fetchCategories().then(data => {
      setAvalibleCategories(data);
    });
  }, [fetchCategories]);

  const handleTransactionAmount = value => {
    setTransactionAmount(value.replace(/([^0-9.])/g, ''));
  };
  const handleChangeCurrency = index => {
    const item = avalibleExchangeRates[index.row];
    setSelectedCurrency(item);
    setSelectedIndex(index);
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
        multiline
        value={transactionNote}
        onChangeText={text => setTransactionNote(text)}
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
  addAmountContainer: {
    flexDirection: 'row',
    marginVertical: 30,
    justifyContent: 'center',
  },
  symbolSelect: {
    width: '30%',
    maxWidth: 150,
    minWidth: 90,
  },
  seperator: {
    width: 15,
  },
  amount: {
    flexGrow: 1,
  },
});
