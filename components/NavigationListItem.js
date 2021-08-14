import React from 'react';
import {Icon, ListItem} from '@ui-kitten/components';

const NavigationListItem = ({item, navigation}) => {
  const navigate = () => {
    navigation.navigate(item.screen, {...item.params});
    // console.log('called');
  };

  return (
    <ListItem
      {...item}
      accessoryLeft={props => <Icon {...props} name={item.icon} />}
      onPress={navigate}
    />
  );
};

export default NavigationListItem;
