import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  FlatList,
} from 'react-native';
import {
  Button,
  Text,
  Input,
  Datepicker,
  Card,
  Select,
  IndexPath,
  Modal,
  SelectItem,
} from '@ui-kitten/components';

import ImageIcon from '../../components/ImageIcon';

import TranslateText from '../../components/TranslateText';
import {useSelector, useDispatch} from 'react-redux';
import {addTransaction} from '../../store/actions/transactions';

import {insertTransactions} from '../../helpers/dbFunctions';

import CategoryItem from '../../components/CategoryItem';

const AddTransactionScreen = ({navigation}) => {
  const currency = useSelector(state => state.settings.currency);
  const categories = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();
  const avalibleExchangeRates = useSelector(state => state.exchangeRates.rates);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [modalOpen, setModalOpen] = useState(false);
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
  const handleChangeCategory = category => {
    setSelectedCategory(category);
    setModalOpen(false);
  };
  const handleSubmit = async () => {
    try {
      var transactionObject = {
        base_currency: currency.base,
        transaction_currency: selectedCurrency.code,
        transaction_type: selectedCategory.type,
        conversion_rate: selectedCurrency.rate,
        transaction_amount:
          (1 / selectedCurrency.rate) * parseInt(transactionAmount),
        transaction_date: transactionDate.toISOString(),
        created_on: new Date().toISOString(),
        note: transactionNote,
        category: selectedCategory.category,
      };
      // console.log(transactionObject);
      const response = await insertTransactions(transactionObject);
      dispatch(addTransaction(response));
      navigation.pop();
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <View style={styles.screen}>
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
              title={() => (
                <Text category="c1">{`${rate.symbol} (${rate.code})`}</Text>
              )}
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
      <View style={styles.selectContainer}>
        <Text category="c1">Category</Text>
        <TouchableNativeFeedback onPress={() => setModalOpen(true)}>
          <View style={[styles.select, styles.padding]}>
            <View style={styles.select}>
              <ImageIcon uri={selectedCategory.imageUri} />
              <Text category="h6">{selectedCategory.category}</Text>
            </View>
            <Text category="h6">{selectedCategory.type}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      <Modal
        visible={modalOpen}
        onBackdropPress={() => setModalOpen(false)}
        style={styles.modal}>
        <Card>
          <FlatList
            data={categories}
            keyExtractor={item => item.category}
            renderItem={item => (
              <CategoryItem item={item.item} onPress={handleChangeCategory} />
            )}
          />
        </Card>
      </Modal>
      <Button onPress={handleSubmit} disabled={!transactionAmount > 0}>
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
  selectContainer: {
    marginVertical: 15,
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  padding: {
    padding: 10,
  },
  modal: {
    height: '80%',
    width: '80%',
  },
});
