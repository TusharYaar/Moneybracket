import React from "react";
import {View,Text,StyleSheet} from "react-native";


const LoadingScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>Money Bracket</Text>
        </View>
    )
}


export default LoadingScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})