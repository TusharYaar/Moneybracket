import React from 'react'
import { StyleSheet, View } from 'react-native';

import { Text } from '@ui-kitten/components';

import { useSelector } from 'react-redux';

const CustomText = (props) => {
    const language = useSelector(state => state.settings);
    console.log(language);
    return (

            <Text category='p1'>{props.title} {props.children}</Text>
    )
}

export default CustomText

const styles = StyleSheet.create({})
