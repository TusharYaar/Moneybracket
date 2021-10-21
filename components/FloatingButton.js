import React from 'react';
import {StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';
import {translateAppText} from '../helpers/translate';
import {useSelector} from 'react-redux';

const FloatingButton = props => {
  const language = useSelector(state => state.settings.language);
  const nativeNumbers = useSelector(state => state.settings.nativeNumbers);
  return (
    <FAB
      style={styles.fab}
      icon="plus"
      onPress={props.onPress}
      label={translateAppText(language, nativeNumbers, props.label, props.tag)}
    />
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
