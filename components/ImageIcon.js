import React from 'react';

import {StyleSheet, Image, View} from 'react-native';

const ImageIcon = ({uri}) => {
  return (
    <View>
      <Image source={{uri}} style={styles.image} />
    </View>
  );
};

export default ImageIcon;

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
  },
});
