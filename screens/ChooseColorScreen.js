import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Card} from 'react-native-paper';
import ColorPicker from 'react-native-wheel-color-picker';
const ChooseColorScreen = ({navigation, route}) => {
  const [color, setColor] = useState('#000000');
  const handleColorChange = color => {
    setColor(color);
  };
  const selectColor = () => {
    navigation.navigate(route.params.returnScreen, {
      [route.params.key]: color,
    });
  };
  return (
    <View style={styles.screen}>
      <Card style={styles.container}>
        <ColorPicker
          color={'efefef'}
          onColorChangeComplete={handleColorChange}
          sliderSize={30}
          noSnap={true}
          row={false}
        />
      </Card>
      <Button style={styles.button} onPress={selectColor}>
        Choose Color
      </Button>
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
    borderWidth: 1,
    borderColor: '#000',
  },
  button: {
    marginVertical: 10,
  },
});
