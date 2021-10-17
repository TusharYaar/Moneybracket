import React, {useEffect, useCallback, useState, useRef} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

import {Button, Icon} from '@ui-kitten/components';
import {updateLockedStatus} from '../store/actions/settings';

import NumberPad from '../components/NumberPad';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LockScreen = () => {
  const originalPin = useSelector(state => state.settings.security.pin);
  const securityType = useSelector(state => state.settings.security.type);
  const [enteredPin, setEnteredPin] = useState('');
  const dispatch = useDispatch();
  const lockIconRef = useRef();
  const containerWidth = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: containerWidth.value,
    };
  });

  const callDispatch = useCallback(() => {
    dispatch(updateLockedStatus({locked: false}));
  }, [dispatch]);

  const unlockApp = useCallback(() => {
    containerWidth.value = withTiming(170, 2000, () => runOnJS(callDispatch)());
  }, [callDispatch]);

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

  const onPinEnter = value => {
    setEnteredPin(`${enteredPin}${value}`);
    if (enteredPin.length >= originalPin.length - 1) {
      if (enteredPin + value === originalPin) return unlockApp();
      else lockIconRef.current.startAnimation(() => setEnteredPin(''));
    }
  };

  useEffect(() => {
    if ('biometrics' === securityType) authCurrent();
    return () => FingerprintScanner.release();
  }, [securityType]);

  return (
    <SafeAreaProvider>
      <View style={styles.topSection}>
        <View style={styles.lockSection}>
          <Icon
            style={styles.icon}
            fill="#000"
            name="lock"
            ref={lockIconRef}
            animation="shake"
          />
          <Animated.View
            style={[styles.lockSectionTextContainer, animatedStyles]}>
            <Text style={styles.lockSectionText}>Unlocked</Text>
          </Animated.View>
        </View>
        <View style={styles.pinContainer}>
          {Array(enteredPin.length)
            .fill(0)
            .map((_, index) => (
              <PinIndicator key={`f${index}`} filled={true} />
            ))}
          {originalPin.length - enteredPin.length > 0 &&
            Array(originalPin.length - enteredPin.length)
              .fill(0)
              .map((_, index) => <PinIndicator key={`nf${index}`} />)}
        </View>
      </View>
      <View style={styles.bottomSection}>
        <NumberPad onPress={onPinEnter} randomize={true} />
      </View>
    </SafeAreaProvider>
  );
};

export default LockScreen;

const styles = StyleSheet.create({
  topSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 0.4 * windowHeight,
  },
  lockSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  lockSectionText: {
    fontSize: 40,
  },
  lockSectionTextContainer: {
    overflow: 'hidden',
    height: 50,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 0.6 * windowHeight,
  },
  pinContainer: {
    width: windowWidth,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    margin: 5,
  },
  filled: {
    backgroundColor: '#000',
  },
});

const PinIndicator = ({filled}) => {
  return (
    <View style={[styles.pinIndicator, filled ? styles.filled : null]}></View>
  );
};
