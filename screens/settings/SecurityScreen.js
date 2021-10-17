import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Radio, RadioGroup, Text, Toggle, Button} from '@ui-kitten/components';

import {useSelector, useDispatch} from 'react-redux';

import {updateSecurity, updateLockedStatus} from '../../store/actions/settings';

import AddPinModal from '../../components/AddPinModal';

const SecurityScreen = () => {
  const security = useSelector(state => state.settings.security);
  const dispatch = useDispatch();
  const [isAddPinModalOpen, setIsAddPinModalOpen] = useState(false);
  const changeLockEnabled = value => {
    if (value) {
      if (security.pin.length === 4) {
        dispatch(updateSecurity({...security, enabled: value}));
      } else {
        Alert.alert(
          'Set A Pin',
          'A pin is required before settings up the lock',
        );
      }
    } else {
      dispatch(
        updateSecurity({...security, enabled: false, lockOnBackground: false}),
      );
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

  const changeLockOnBackground = value => {
    if (security.enabled) {
      dispatch(updateSecurity({...security, lockOnBackground: value}));
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.enableLock}>
        {/* Secton  to enable lock */}
        <Text category="c1">
          <Text category="h5">Enable Lock</Text>(experimental)
        </Text>
        <Toggle checked={security.enabled} onChange={changeLockEnabled} />
      </View>
      <View style={styles.enableLock}>
        {/* Secton  to enable lock */}
        <Text category="c1">
          <Text category="h5">Lock On Backgorund</Text>(experimental)
        </Text>
        <Toggle
          disabled={!security.enabled}
          checked={security.lockOnBackground}
          onChange={changeLockOnBackground}
        />
      </View>
      <View>
        {/* Section to set a type of security */}
        <Text category="c1">
          <Text category="h5">Set Security Type</Text> (experimental)
        </Text>
        {!security.enabled && (
          <Text category="c2">Enable lock to choose a type</Text>
        )}
        <RadioGroup
          onChange={changeSecurityType}
          selectedIndex={security.type === 'biometrics' ? 1 : 0}>
          <Radio disabled={!security.enabled}>Pin Security</Radio>
          <Radio disabled={!security.enabled}>
            Biometrics Security
            <Text category="label"> (pin will still be used as a backup)</Text>
          </Radio>
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

const styles = StyleSheet.create({
  screen: {padding: 10},
  enableLock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
});
