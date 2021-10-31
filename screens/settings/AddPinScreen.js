import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import {Button, TextInput} from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';

import {updateSecurity} from '../../store/actions/settings';

const AddPinScreen = ({navigation}) => {
  const security = useSelector(state => state.settings.security);
  const pin = useSelector(state => state.settings.security.pin);
  const [newPin, setNewPin] = useState('');
  const [newPinConfirm, setNewPinConfirm] = useState('');
  const [oldPin, setOldPin] = useState('');
  const dispatch = useDispatch();
  const setPin = () => {
    if (pin && pin.length == 4 && pin !== oldPin) {
      Alert.alert('Wrong Pin', 'The current pin you entered does not match');
      return;
    }
    if (
      newPin === newPinConfirm &&
      newPin.length === 4 &&
      parseInt(newPin) > 0
    ) {
      dispatch(updateSecurity({...security, enabled: true, pin: newPin}));
      navigation.navigate('Security', {pinUpdated: true});
    }
  };
  console.log('Pin', pin.length);
  return (
    <View style={styles.screen}>
      {pin.length == 4 && (
        <TextInput
          label="Confirm current Pin"
          value={oldPin}
          x
          maxLength={4}
          keyboardType={'number-pad'}
          onChangeText={text => setOldPin(text)}
        />
      )}
      <TextInput
        label="New Pin"
        value={newPin}
        maxLength={4}
        keyboardType={'number-pad'}
        onChangeText={text => setNewPin(text)}
      />
      <TextInput
        label="Confirm new Pin"
        value={newPinConfirm}
        maxLength={4}
        keyboardType={'number-pad'}
        onChangeText={text => setNewPinConfirm(text)}
      />
      <Button
        onPress={setPin}
        disabled={
          newPin === newPinConfirm && newPin.length === 4 ? false : true
        }>
        {pin.length === 4 ? 'Change Pin' : 'Add Pin'}
      </Button>
    </View>
  );
};

export default AddPinScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 5,
  },
});
