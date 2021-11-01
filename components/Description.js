import React from 'react';
import {Caption, withTheme} from 'react-native-paper';

import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Description = ({children, style, theme}) => {
  const {colors} = theme;
  return (
    <View style={styles.container}>
      <Icon name="comment-question-outline" size={20} color={colors.accent} />
      <Caption style={[styles.caption, style]}>{children}</Caption>
    </View>
  );
};

export default withTheme(Description);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
  },
  caption: {
    lineHeight: 15,
  },
});
