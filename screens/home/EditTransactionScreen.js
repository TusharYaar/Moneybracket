import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

import {deleteTransactionFromDb} from '../../helpers/dbFunctions';

import {useSelector, useDispatch} from 'react-redux';
import {deleteTransaction} from '../../store/actions/transactions';

const EditTransactionScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await deleteTransactionFromDb(route.params.transactionId);
    dispatch(deleteTransaction(route.params.transactionId));
    navigation.goBack();
  };

  return (
    <View>
      <Text></Text>
      <Button onPress={handleDelete}>Delete</Button>
    </View>
  );
};

export default EditTransactionScreen;

const styles = StyleSheet.create({});
