import React, {useState, useRef, useMemo} from 'react';
import {StyleSheet, View, TouchableNativeFeedback} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Button,
  Caption,
  Menu,
  TextInput,
  List,
  useTheme,
} from 'react-native-paper';

import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';

import ImageIcon from '../../components/ImageIcon';

import BottomSheetCategory from '../../components/BottomSheetCategory';
import BottomSheetCurrency from '../../components/BottomSheetCurrency';

import TranslateText from '../../components/TranslateText';
import {useSelector, useDispatch} from 'react-redux';
import {addTransaction} from '../../store/actions/transactions';

import {insertTransactions} from '../../helpers/dbFunctions';

const AddTransactionScreen = ({navigation}) => {
  const {colors} = useTheme();
  const currency = useSelector(state => state.settings.currency);
  const categories = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();
  const avalibleExchangeRates = useSelector(state => state.exchangeRates.rates);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionNote, setTransactionNote] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(
    avalibleExchangeRates.find(item => item.code === currency.base),
  );
  const [bsType, setBsType] = useState('category');
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [500], []);

  const handleDateChange = ({nativeEvent, type}) => {
    setShowDate(false);
    if (type === 'set') {
      setTransactionDate(nativeEvent.timestamp);
    }
  };

  const handleTransactionAmount = value => {
    setTransactionAmount(value.replace(/([^0-9.])/g, ''));
  };

  const handleChangeCurrency = code => {
    const item = avalibleExchangeRates.find(currency => code === currency.code);
    setSelectedCurrency(item);
  };
  const handleChangeCategory = category => {
    setSelectedCategory(category);
    bottomSheetRef.current.close();
  };
  const openBottomSheet = type => {
    setBsType(type);
    bottomSheetRef.current.snapToIndex(0);
  };

  const handleBsRender = ({item}) => {
    if (bsType == 'category') {
      return <BottomSheetCategory item={item} onPress={handleChangeCategory} />;
    } else
      return <BottomSheetCurrency item={item} onPress={handleChangeCurrency} />;
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
        <Button onPress={() => setShowDate(true)}>Date</Button>
        {showDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={transactionDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <View style={styles.addAmountContainer}>
        <TextInput
          placeholder="Transaction Amount"
          style={styles.amount}
          value={transactionAmount}
          onChangeText={handleTransactionAmount}
          keyboardType="decimal-pad"
        />
        <View style={styles.seperator} />
        <Button onPress={() => openBottomSheet('currency')}>
          {selectedCurrency.code}
        </Button>
      </View>
      {selectedCurrency.code != currency.base && transactionAmount.length > 0 && (
        <Caption>
          {currency.symbol}
          {((1 / selectedCurrency.rate) * parseInt(transactionAmount)).toFixed(
            2,
          )}
        </Caption>
      )}
      <TextInput
        placeholder="Note"
        label="Note"
        multiline
        value={transactionNote}
        onChangeText={text => setTransactionNote(text)}
      />
      <View style={styles.selectContainer}>
        <Caption category="c1">Category</Caption>
        <TouchableNativeFeedback onPress={() => openBottomSheet('category')}>
          <View style={[styles.select, styles.padding]}>
            <View style={styles.select}>
              <ImageIcon uri={selectedCategory.imageUri} />
              <Caption category="h6">{selectedCategory.category}</Caption>
            </View>
            <Caption category="h6">{selectedCategory.type}</Caption>
          </View>
        </TouchableNativeFeedback>
      </View>
      <Button onPress={handleSubmit} disabled={!transactionAmount > 0}>
        Add Transaction
      </Button>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backgroundStyle={[
          styles.bottomsheet,
          {
            backgroundColor: colors.background,
            borderColor: colors.primary,
          },
        ]}
        handleIndicatorStyle={{backgroundColor: colors.accent}}
        enablePanDownToClose={true}>
        <BottomSheetFlatList
          data={bsType === 'category' ? categories : avalibleExchangeRates}
          keyExtractor={item => item.category}
          contentContainerStyle={styles.contentContainer}
          renderItem={item => handleBsRender(item)}
        />
        {console.log(avalibleExchangeRates)}
      </BottomSheet>
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
  bottomsheet: {
    borderWidth: 2,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
});

{
  /* <Menu
          visible={changeCurrencyVisible}
          anchor={
            <Button
              onPress={() => setChangeCurrencyVisible(!changeCurrencyVisible)}>
              {selectedCurrency.code}
            </Button>
          }>
          {avalibleExchangeRates.map(rate => (
            <Menu.Item
              key={rate.code}
              onPress={() => handleChangeCurrency(rate.code)}
              title={`${rate.symbol} (${rate.code})`}
            />
          ))}
        </Menu> */
}
