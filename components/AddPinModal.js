import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Card, Input, Button, Modal} from '@ui-kitten/components';

import {useSelector, useDispatch} from 'react-redux';

import {updateSecurity} from '../store/actions/settings';

const AddPinModal = props => {
  const security = useSelector(state => state.settings.security);
  const [pin, setPin] = useState('');
  const [pinConfirm, setPinConfirm] = useState('');
  const dispatch = useDispatch();

  const updatePin = value => {
    setPin(value.replace(/([^0-9.])/g, ''));
  };
  const updatePinConfirm = value => {
    setPinConfirm(value.replace(/([^0-9.])/g, ''));
  };
  const setSecurityPin = () => {
    if (pin === pinConfirm && pin.length === 4 && parseInt(pin) > 0) {
      dispatch(updateSecurity({...security, enabled: true, pin: pin}));
      props.closeModal();
    } else {
      alert('Pin do not match');
    }
  };
  return (
    <Modal
      {...props}
      onBackdropPress={props.closeModal}
      backdropStyle={styles.backdrop}>
      <Card>
        <Text category="h5">Set A Pin</Text>
        <Text category="c1">
          You can set a pin as a primary way to unlock the app, or as a
          secondary menthod if your biometrics did not work properly.
        </Text>
        <View>
          <Text category="h6">Set A Pin</Text>
          <Input
            value={pin}
            onChangeText={updatePin}
            maxLength={4}
            keyboardType={'number-pad'}
          />
          <Text category="h6">Confirm Pin</Text>

          <Input
            value={pinConfirm}
            onChangeText={updatePinConfirm}
            maxLength={4}
            keyboardType={'number-pad'}
          />
        </View>
        <Button
          onPress={setSecurityPin}
          disabled={pin === pinConfirm && pin.length === 4 ? false : true}>
          Confirm Pin
        </Button>
      </Card>
    </Modal>
  );
};

export default AddPinModal;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
