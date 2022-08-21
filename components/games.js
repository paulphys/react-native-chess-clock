import React from 'react'
import {
    StyleSheet,
    View,
    Button,
    Modal,
    Text,
    TextInput,
    Image,
    KeyboardAvoidingView,
} from 'react-native'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import Ionicons from '@expo/vector-icons/Ionicons'
import CustomButton from '../components/button'
import Card from '../components/card'

export default function Games({ getAllGames }) {
    let games = getAllGames()
    console.log(games)
    let body = ''
    if (true == true) {
        body = <Text style={styles.text}></Text>
    } else {
        body = <Text style={styles.text}>You haven't played a game yet</Text>
    }
    return <>{body}</>
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontFamily: 'Inter_700Bold',
        color: 'white',
    },
})
