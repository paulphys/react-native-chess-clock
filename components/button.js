import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'

export default function CustomButton({
    text,
    onPress,
    setTimers,
    time,
    inc,
}) {
    return (
        <TouchableOpacity
            onPress={(values) => {
                let whiteTimer = time * 60000
                let blackTimer = time * 60000
                let increment = inc * 1000
                setTimers(whiteTimer, blackTimer, increment)
            }}
        >
            <View style={[styles.button, { backgroundColor: "black" }]}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 10,
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 31,
        textAlign: 'center',
    },
})
