import React, {useEffect, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import {useSelector, useDispatch} from 'react-redux';

import {Button} from '@ui-kitten/components';
import {updateLockedStatus} from '../store/actions/settings';

const LockScreen = () => {
  const originalPin = useSelector(state => state.settings.security.pin);

  const dispatch = useDispatch();
  const unlockApp = () => {
    dispatch(updateLockedStatus({locked: false}));
  };

  const authCurrent = () => {
    FingerprintScanner.authenticate({
      title: 'Log in with Biometrics',
      subTitle: 'Please place your finger on the sensor',
      description:
        'This method uses your prefered authentication method to authenticate the app',
      cancelButton: 'Use Pin',
    })
      .then(response => {
        if (response) unlockApp();
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    authCurrent();
    return () => FingerprintScanner.release();
  }, []);

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
