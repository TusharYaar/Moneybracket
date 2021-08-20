// Convert the given key to the language-specific string
// key is given in translate prop

import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {translateAppText, getFont} from '../helpers/translate';

const TranslateText = props => {
  const language = useSelector(state => state.settings.language);
  return (
    <Text
      {...props}
      style={[styles.font, props.style, {fontFamily: getFont(language)}]}>
      {translateAppText(language, props.translate, props.tag)}
    </Text>
  );
};

export default TranslateText;

const styles = StyleSheet.create({
  font: {
    fontSize: 20,
  },
});
