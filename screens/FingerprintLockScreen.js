import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useSelector} from 'react-redux';

const FingerprintLockScreen = props => {
  const {navigation} = props;
  const lockType = useSelector(state => state.settings.security.type);

  return (
    <View>
      <Text> FingerPrint Screen</Text>
    </View>
  );
};

export default FingerprintLockScreen;

const styles = StyleSheet.create({});
