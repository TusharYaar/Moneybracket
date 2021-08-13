import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Text} from '@ui-kitten/components';

import {useSelector} from 'react-redux';

import {translateAppText} from '../helpers/translate';

const CustomText = props => {
  const language = useSelector(state => state.settings.language);
  return (
    <Text category="h6">
      {props.translate ? translateAppText(language, props.translate) : ''}
      {props.children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({});
