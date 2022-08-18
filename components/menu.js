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

export default function Menu({
    showModal,
    openAndCloseModal,
    showGames,
    openAndCloseGames,
    setTimers,
    resetTimers,
    moveCounter,
    pauseGame,
    isPaused,
    increment,
    setIncrement
}) {
    let gameState = ''
    if (isPaused) {
        gameState = (
            <View style={styles.rowicon}>
                <MaterialIcons
                    size={34}
                    color="white"
                    name="play-arrow"
                    onPress={pauseGame}
                />
            </View>
        )
    } else {
        gameState = (
            <View style={styles.rowicon}>
                <MaterialIcons
                    size={34}
                    color="white"
                    name="pause"
                    onPress={pauseGame}
                />
            </View>
        )
    }
    let body = ''
    if (moveCounter == 0) {
        body = (
            <>
                <View style={styles.row}>
                    <View style={styles.rowicon}>
                        <MaterialIcons style={styles.icon} size={35} color="white" name="view-list" onPress={openAndCloseGames}/> 
                    </View>
                    <View style={styles.rowicon}>
                    <MaterialIcons
                        size={34}
                        color="white"
                        name="settings"
                        onPress={openAndCloseModal}
                    />
                </View>
                </View>
            </>
        )
    } else {
        body = (
            <>
                <View style={styles.row}>
                    <View style={styles.rowicon}>
                        <MaterialIcons
                            size={34}
                            color="white"
                            name="replay"
                            onPress={resetTimers}
                        />
                    </View>
                    <View style={styles.rowicon}>
                        <Text style={styles.text}>Move {moveCounter}</Text>
                    </View>
                    {gameState}
                </View>
            </>
        )
    }

    return (
        <View style={styles.menu}>
            <Modal visible={showModal} animationType="none">
                <View style={styles.modal}>
                    <View style={styles.container}>
                        <CustomButton
                            text="1/0"
                            time="1"
                            inc="0"
                            setTimers={setTimers}
                        />
                        <CustomButton
                            text="1/2"
                            time="1"
                            inc="2"
                            setTimers={setTimers}
                        />
                        <CustomButton
                            text="3/0"
                            time="3"
                            inc="0"
                            setTimers={setTimers}
                        />
                        <CustomButton
                            text="5/3"
                            time="5"
                            inc="3"
                            setTimers={setTimers}
                        />
                        <CustomButton
                            text="10/0"
                            time="10"
                            inc="0"
                            setTimers={setTimers}
                        />
                        <CustomButton
                            text="10/5"
                            time="10"
                            inc="5"
                            setTimers={setTimers}
                        />
                        <CustomButton
                            text="15/0"
                            time="15"
                            inc="0"
                            setTimers={setTimers}
                        />
                        <CustomButton
                            text="15/10"
                            time="15"
                            inc="10"
                            setTimers={setTimers}
                        />
                        <CustomButton
                            text="30/0"
                            time="30"
                            inc="0"
                            setTimers={setTimers}
                        />
                    </View>
                </View>
            </Modal>

            <Modal visible={showGames} animationType="none">
                <View style={styles.modal}>
                    <Button title="Back" onPress={openAndCloseGames}/> 
                </View>
            </Modal>
            {body}
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    rowicon: {},
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    icon: {
        paddingHorizontal: 1,
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modal: {
        flex: 1,
        backgroundColor: 'black',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 8,
        fontSize: 18,
        borderRadius: 6,
        margin: 10,
        flex: 1,
    },
    container: {
        marginTop: 40,
        flex: 1,
        padding: 8,
    },
    text: {
        fontSize: 20,
        fontFamily: 'Inter_700Bold',
        color: 'white',
    },
    inputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 6,
        textAlignVertical: 'center',
    },
    space: {
        fontSize: 4,
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})
