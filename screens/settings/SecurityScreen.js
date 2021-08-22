import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Radio, RadioGroup, Text, Input, Button} from '@ui-kitten/components';

import {useSelector, useDispatch} from 'react-redux';

import {updateSecurity, updateLockedStatus} from '../../store/actions/settings';
// import {} from '../store/actions/settings';

import AddPinModal from '../../components/AddPinModal';

const SecurityScreen = () => {
  const security = useSelector(state => state.settings.security);
  const dispatch = useDispatch();
  const [isAddPinModalOpen, setIsAddPinModalOpen] = useState(false);
  const changeLockEnabled = value => {
    if (value === 1) {
      if (security.pin.length === 4) {
        dispatch(updateSecurity({...security, enabled: true}));
      } else {
        Alert.alert(
          'Set A Pin',
          'A pin is required before settings up the lock',
        );
      }
    } else {
      dispatch(updateSecurity({...security, enabled: false}));
    }
  };

  const changeSecurityType = value => {
    if (value === 0) {
      dispatch(updateSecurity({...security, type: 'pin'}));
    } else if (value === 1) {
      dispatch(updateSecurity({...security, type: 'biometrics'}));
    }
  };

  const toggleAddPinModal = () => {
    setIsAddPinModalOpen(value => !value);
  };
  const closeModal = () => {
    setIsAddPinModalOpen(false);
  };

  return (
    <View>
      <View>
        {/* Secton  to enable lock */}
        <Text category="c1">
          <Text category="h5">Enable Lock</Text>(experimental)
        </Text>
        <RadioGroup
          onChange={changeLockEnabled}
          selectedIndex={security.enabled ? 1 : 0}>
          <Radio>
            <Text>Disable</Text>
          </Radio>
          <Radio>
            <Text>Enable</Text>
          </Radio>
        </RadioGroup>
      </View>
      <View>
        {/* Section to set a type of security */}
        <Text category="c1">
          <Text category="h5">Set Security Type</Text> (experimental)
        </Text>
        <RadioGroup
          onChange={changeSecurityType}
          selectedIndex={security.type === 'biometrics' ? 1 : 0}>
          <Radio>Pin Security</Radio>
          <Radio>Biometrics Security</Radio>
        </RadioGroup>
      </View>
      <View>
        <AddPinModal visible={isAddPinModalOpen} closeModal={closeModal} />
        <Button onPress={toggleAddPinModal}> Add Pin </Button>
        {/*! Remove This in final Version */}
        <Button onPress={() => dispatch(updateLockedStatus({locked: true}))}>
          Lock App
        </Button>
      </View>
    </View>
  );
};

export default SecurityScreen;

const styles = StyleSheet.create({});
