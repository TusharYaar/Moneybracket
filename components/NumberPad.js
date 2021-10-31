import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const numberArray = [
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3},
  {label: '4', value: 4},
  {label: '5', value: 5},
  {label: '6', value: 6},
  {label: '7', value: 7},
  {label: '8', value: 8},
  {label: '9', value: 9},
  {label: '0', value: 0},
];
/**
 * @component NumberPad
 * @param {function} onPress [required] - requiredfunction to be called when a number is pressed
 * @param {string} [randomize=false] [optional] - randomize the number pad
 * @param {Object[]} customInput  [optional] - customize the label/value of keys
 * @param {string} customInput[].label - customize the label/value of keys
 * @param {(string|Number)} customInput[].value - customize the label/value of keys
 *
 * @returns
 */
const NumberPad = ({onPress, randomize = false, customInput = numberArray}) => {
  const [keyboardArray, setKeyboardArray] = useState([]);
  const handleKeyPress = value => {
    onPress(value);
  };
  useEffect(() => {
    var randomArray = customInput;
    if (randomize) {
      randomArray = customInput.sort(() => Math.random() - 0.5);
    }
    setKeyboardArray([...randomArray]);
  }, [randomize]);

  const handleMap = keyboardArray.map((key, index) => {
    let style = styles.centerColumn;
    switch (index) {
      case 0:
      case 2:
      case 3:
      case 5:
        style = styles.sideColumn;
        break;
      case 6:
      case 8:
        style = styles.sideColumnWbottom;
    }
    return (
      <PinButton
        key={key.label}
        style={style}
        onPress={() => {
          handleKeyPress(key.value);
        }}
        label={key.label}
      />
    );
  });
  return <View style={styles.numpad}>{handleMap}</View>;
};
const PinButton = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={props.onPress}
        style={[styles.touchable, props.style]}>
        <Text style={styles.text}>{props.label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NumberPad;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
  },

  touchable: {
    alignItems: 'center',
    width: '100%',
    height: 70,
    borderColor: '#000',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: '#000',
  },
  numpad: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  centerColumn: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  sideColumn: {
    borderTopWidth: 1,
  },
  sideColumnWbottom: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
});
