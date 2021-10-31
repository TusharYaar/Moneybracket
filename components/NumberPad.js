import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const NumberPad = ({onPress, randomize = false, customInput = []}) => {
  const [keyboardArray, setKeyboardArray] = useState([]);
  const handleKeyPress = value => {
    onPress(value);
  };
  useEffect(() => {
    useArr = customInput.length > 0 ? customInput : numberArray;
    if (randomize) {
      const randomArray = useArr.sort(() => Math.random() - 0.5);
      setKeyboardArray([...randomArray]);
    }
  }, [randomize]);

  const handleMap = keyboardArray.map((number, index) => {
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
        key={number}
        style={style}
        onPress={() => {
          handleKeyPress(number);
        }}
        value={number}
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
        <Text style={styles.text}>{props.value}</Text>
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
