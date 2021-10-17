// Convert the given key to the language-specific string
// text to translate is given in translate prop/ or in children
// uses Text from react-native-paper
// defaults to c1 text style
import React from 'react';
import {useSelector} from 'react-redux';
import {translateAppText, getFont} from '../helpers/translate';
import {Paragraph} from 'react-native-paper';

const TranslateText = props => {
  const language = useSelector(state => state.settings.language);
  const nativeNumbers = useSelector(state => state.settings.nativeNumbers);
  return (
    <Paragraph
      {...props}
      style={[props.style, {fontFamily: getFont(language)}]}>
      {props.translate &&
        translateAppText(language, nativeNumbers, props.translate, props.tag)}
      {props.children &&
        translateAppText(language, nativeNumbers, props.children, props.tag)}
    </Paragraph>
  );
};

export default TranslateText;
