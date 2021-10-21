import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import FloatingButton from '../../components/FloatingButton';

const AllRecurringPaymentsScreen = ({navigation}) => {
  return (
    <View style={styles.screen}>
      <Text>AllRecurringPaymentsScreen</Text>
      <FloatingButton
        onPress={() => navigation.navigate('AddRecurringTransaction')}
        label="add_recurring_transaction"
      />
    </View>
  );
};

export default AllRecurringPaymentsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
