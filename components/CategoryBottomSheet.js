import React, {forwardRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import {List, withTheme} from 'react-native-paper';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
const CategoryBottomSheet = ({fref, snapPoints, onPress, theme}) => {
  const {colors} = theme;
  const categories = useSelector(state => state.categories.categories);
  return (
    <BottomSheet
      ref={fref}
      index={-1}
      snapPoints={snapPoints}
      backgroundStyle={[
        styles.bottomsheet,
        {
          backgroundColor: colors.background,
          borderColor: colors.primary,
        },
      ]}
      handleIndicatorStyle={{backgroundColor: colors.accent}}
      enablePanDownToClose={true}>
      <BottomSheetFlatList
        data={categories}
        keyExtractor={item => item.category}
        contentContainerStyle={styles.contentContainer}
        enablePanDownToClose={true}
        renderItem={item => (
          <BottomSheetItem item={item.item} onPress={onPress} />
        )}
      />
    </BottomSheet>
  );
};

const BottomSheetItem = ({item, onPress}) => {
  const handlePress = () => {
    onPress(item);
  };

  return (
    <List.Item
      title={item.category}
      description={item.type}
      onPress={handlePress}
      left={props => <List.Icon {...props} icon="buffer" color={item.color} />}
    />
  );
};

export default withTheme(CategoryBottomSheet);

const styles = StyleSheet.create({
  bottomsheet: {
    borderWidth: 2,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
});
