import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const NumberPad = props => {
  const handleKeyPress = value => {
    props.onPress(value);
  };

  return (
    <View style={styles.numpad}>
      {numberArray.map(number => (
        <PinButton
          key={number}
          onPress={() => {
            handleKeyPress(number);
          }}
          value={number}
        />
      ))}
    </View>
  );
};

const PinButton = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} style={styles.touchable}>
        <Text style={styles.text}>{props.value}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NumberPad;

const styles = StyleSheet.create({
  container: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  touchable: {
    height: 80,
    width: 80,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    borderRadius: 40,
    margin: 10,
  },
  text: {
    fontSize: 30,
    color: 'rgba(255,255,255,0.8)',
  },
  numpad: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
