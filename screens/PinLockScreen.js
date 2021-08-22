import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {Button} from '@ui-kitten/components';
import {updateLockedStatus} from '../store/actions/settings';

const LockScreen = () => {
  const dispatch = useDispatch();
  const unlockApp = () => {
    dispatch(updateLockedStatus({locked: false}));
  };
  return (
    <View>
      <Text>This is Lock screen</Text>
      <Button onPress={unlockApp}>Unlock</Button>
      <View></View>
    </View>
  );
};

export default LockScreen;

const styles = StyleSheet.create({});
