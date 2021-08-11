import React from 'react';
import {Button, Icon} from '@ui-kitten/components';
import {StyleSheet } from "react-native";

const UserIcon = props => {
    return (<Icon {...props} name={props.icon || "star"}/>);
};


const IconButton = props => {
  return (
    <Button
      style={props.style}
      appearance={props.appearance ? props.appearance : 'ghost'}
      status={props.status ? props.status : 'primary'}
      accessoryLeft={(imageProps) => <UserIcon {...imageProps} icon={props.icon}/>}
      onPress={props.onPress}
      size="large"
    />
  );
};

export default IconButton;

const styles = StyleSheet.create({

})
