import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {TinyColor, mostReadable} from '@ctrl/tinycolor';
import {Headline, Paragraph} from 'react-native-paper';
const ThemeColor = ({color, title = '', onPress, style}) => {
  const colorObj = new TinyColor(color);
  const hexValue = colorObj.toHexString();
  const readableColor = mostReadable(hexValue, ['#124', '#125'], {
    includeFallbackColors: true,
  }).toHexString();
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: color}, style]}
      onPress={onPress}>
      <Paragraph style={{color: readableColor, fontSize: 20}}>
        {title}
      </Paragraph>
      <Paragraph style={{color: readableColor}}>{hexValue}</Paragraph>
    </TouchableOpacity>
  );
};

export default ThemeColor;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 70,
  },
});
