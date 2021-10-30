// Convert the given key to the language-specific string
// text to translate is given in translate prop/ or in children
// uses Text from react-native-paper
// defaults to c1 text style
import React from 'react';
import {useSelector} from 'react-redux';
import {translateAppText} from '../helpers/translate';
import {
  Paragraph,
  Headline,
  Subheading,
  Caption,
  Title,
} from 'react-native-paper';

const TranslateText = props => {
  const language = useSelector(state => state.settings.language);
  const nativeNumbers = useSelector(state => state.settings.nativeNumbers);
  let Category = Paragraph;
  switch (props.category) {
    case 'headline':
      Category = Headline;
      break;
    case 'subheading':
      Category = Subheading;
      break;
    case 'caption':
      Category = Caption;
      break;
    case 'title':
      Category = Title;
      break;
    default:
      Category = Paragraph;
  }

  return (
    <Category {...props} style={props.style}>
      {props.translate &&
        translateAppText(language, nativeNumbers, props.translate, props.tag)}
      {props.children &&
        translateAppText(language, nativeNumbers, props.children, props.tag)}
    </Category>
  );
};

export default TranslateText;
