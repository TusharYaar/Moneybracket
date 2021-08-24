// Convert the given key to the language-specific string
// text to translate is given in translate prop/ or in children
// uses Text from ui-kitten
// defaults to c1 text style
import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {translateAppText, getFont} from '../helpers/translate';
import {Text} from '@ui-kitten/components';

const TranslateText = props => {
  const language = useSelector(state => state.settings.language);
  return (
    <Text
      category={props.category ? props.category : 'c1'}
      {...props}
      style={[props.style, {fontFamily: getFont(language)}]}>
      {props.translate &&
        translateAppText(language, props.translate, props.tag)}
      {props.children && translateAppText(language, props.children, props.tag)}
    </Text>
  );
};

export default TranslateText;

const styles = StyleSheet.create({});
