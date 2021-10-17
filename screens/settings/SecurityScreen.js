import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Radio, RadioGroup, Text, Toggle} from '@ui-kitten/components';

import {
  RadioButton,
  Button,
  Title,
  Paragraph,
  Switch,
  Subheading,
  Caption,
} from 'react-native-paper';

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
    dispatch(updateSecurity({...security, type: value}));
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
      <Title>Security</Title>
      <Subheading>Lock Settings</Subheading>
      <View style={styles.switchOption}>
        {/* Secton  to enable lock */}
        <Paragraph>Enable Lock (experimental)</Paragraph>
        <Switch value={security.enabled} onValueChange={changeLockEnabled} />
      </View>
      <View style={styles.switchOption}>
        {/* Secton  to enable lock */}
        <Paragraph>Lock On Backgorund (experimental)</Paragraph>
        <Switch
          disabled={!security.enabled}
          value={security.lockOnBackground}
          onValueChange={changeLockOnBackground}
        />
      </View>
      <View>
        {/* Section to set a type of security */}
        <Paragraph>Preffered Authentication Method (experimental)</Paragraph>
        {!security.enabled && <Caption>Enable lock to choose a type</Caption>}
        <RadioButton.Group
          onValueChange={changeSecurityType}
          value={security.type}>
          <View style={styles.radioOption}>
            <RadioButton disabled={!security.enabled} value="pin" />
            <Paragraph>Pin Security</Paragraph>
          </View>
          <View style={styles.radioOption}>
            <RadioButton disabled={!security.enabled} value="biometrics" />
            <Paragraph>Biometrics Security </Paragraph>
            <Caption> (pin will still be used as a backup)</Caption>
          </View>
        </RadioButton.Group>
      </View>
      <View>
        <AddPinModal visible={isAddPinModalOpen} closeModal={closeModal} />
        <Button onPress={toggleAddPinModal}>Add Pin</Button>
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
  switchOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  radioOption: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
