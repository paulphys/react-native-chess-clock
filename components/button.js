import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'

export default function CustomButton({ text, color, onPress }) {
    return(
        <TouchableOpacity onPress={onPress}>
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
        fontSize: 16,
        textAlign: 'center'
    }
})