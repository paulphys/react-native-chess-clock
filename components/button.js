import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'

export default function CustomButton({ text, color, onPress, setTimers, time }) {
    return(
        <TouchableOpacity 
            onPress={(values) => {
                    let whiteTimer = time * 60000;
                    let blackTimer = time * 60000;
                    setTimers(whiteTimer, blackTimer);
                    }}>

            <View style={[styles.button, {backgroundColor: color}]}>
                <Text style={styles.buttonText}>{ text }</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 10,
        marginHorizontal: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 42,
        textAlign: 'center'
    }
})