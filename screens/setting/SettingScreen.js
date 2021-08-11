import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

const SettingScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>Settings Screen</Text>
        </View>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
