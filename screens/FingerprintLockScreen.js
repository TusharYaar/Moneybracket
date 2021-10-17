import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '@ui-kitten/components';
import {useSelector} from 'react-redux';

const FingerprintLockScreen = props => {
  const {navigation} = props;
  const lockType = useSelector(state => state.settings.security.type);

  const authCurrent = async () => {
    try {
      const response = await FingerprintScanner.authenticate({
        title: 'Log in with Biometrics',
        subTitle: 'Please place your finger on the sensor',
        description:
          'This method uses your preffered authentication method to authenticate the app',
        cancelButtonTitle: 'Use Pin',
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    authCurrent();

    return () => FingerprintScanner.release();
  }, []);

  return (
    <View>
      <Text> FingerPrint Screen</Text>
      <Button onPress={authCurrent}>Again</Button>
    </View>
  );
};

export default FingerprintLockScreen;

const styles = StyleSheet.create({});
