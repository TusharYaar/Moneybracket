import React, {useState, useRef, useMemo} from 'react';
import {StyleSheet, View, TouchableNativeFeedback} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Button,
  Caption,
  TextInput,
  useTheme,
  Subheading,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';

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
  const categoryBottomSheetRef = useRef(null);
  const currencyBottomSheetRef = useRef(null);
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
    currencyBottomSheetRef.current.close();
  };
  const handleChangeCategory = category => {
    setSelectedCategory(category);
    categoryBottomSheetRef.current.close();
  };
  const openBottomSheet = type => {
    if (type === 'category') {
      currencyBottomSheetRef.current.close();
      categoryBottomSheetRef.current.snapToIndex(0);
    } else {
      categoryBottomSheetRef.current.close();
      currencyBottomSheetRef.current.snapToIndex(0);
    }
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
      <View>
        {selectedCurrency.code != currency.base &&
          transactionAmount.length > 0 && (
            <Caption>
              {currency.symbol}
              {(
                (1 / selectedCurrency.rate) *
                parseInt(transactionAmount)
              ).toFixed(2)}
            </Caption>
          )}
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

      <TextInput
        placeholder="Note"
        label="Note"
        multiline
        value={transactionNote}
        onChangeText={text => setTransactionNote(text)}
      />
      <View style={styles.selectContainer}>
        <TranslateText category="subheading">Category</TranslateText>
        <TouchableNativeFeedback onPress={() => openBottomSheet('category')}>
          <View style={[styles.select, styles.padding]}>
            <View style={styles.select}>
              <Icon name="buffer" color={selectedCategory.color} size={30} />
              <Subheading>{selectedCategory.category}</Subheading>
            </View>
            <Caption>{selectedCategory.type}</Caption>
          </View>
        </TouchableNativeFeedback>
      </View>
      <Button onPress={handleSubmit} disabled={!transactionAmount > 0}>
        Add Transaction
      </Button>
      <BottomSheet
        ref={categoryBottomSheetRef}
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
          data={categories}
          keyExtractor={item => item.category}
          contentContainerStyle={styles.contentContainer}
          renderItem={item => (
            <BottomSheetCategory
              item={item.item}
              onPress={handleChangeCategory}
            />
          )}
        />
      </BottomSheet>
      <BottomSheet
        ref={currencyBottomSheetRef}
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
          data={avalibleExchangeRates}
          keyExtractor={item => item.category}
          contentContainerStyle={styles.contentContainer}
          renderItem={item => (
            <BottomSheetCurrency
              item={item.item}
              onPress={handleChangeCurrency}
            />
          )}
        />
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
  addAmountContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'center',
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
