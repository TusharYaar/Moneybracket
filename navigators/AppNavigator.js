import React from 'react'

import { StyleSheet} from 'react-native'

import DrawerNavigator from "./DrawerNavigator"
import {useSelector } from "react-redux";

const AppNavigator = () => {
 
    const settings =  useSelector(state => state.settings);

    return  <DrawerNavigator />
  
    
}

export default AppNavigator

const styles = StyleSheet.create({})
