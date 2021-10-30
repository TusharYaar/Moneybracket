import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
const ChooseColorScreen = () => {
  const handleColorChange = color => {
    console.log(color);
  };
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <ColorPicker
          // ref={r => { this.picker = r }}
          color={'efefef'}
          // onColorChange={handleColorChange}
          onColorChangeComplete={handleColorChange}
          // sliderSize={40}
          noSnap={true}
          row={false}
          // swatchesLast={this.state.swatchesLast}
          // swatches={this.state.swatchesEnabled}
          // discrete={this.state.disc}
        />
      </View>
    </View>
  );
};

export default ChooseColorScreen;

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    flex: 1,
  },
  container: {
    padding: 10,
    justifyContent: 'center',
    height: '70%',
  },
});
