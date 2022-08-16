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
}) {
    let body = ''

    if (moveCounter == 0) {
        body = (
            <>
                {/*<Text style={styles.icon}>
                <MaterialIcons style={styles.icon} size={35} color="white" name="view-list" onPress={openAndCloseGames}/> 
        </Text> */}
                <Text style={styles.icon}>
                    <MaterialIcons
                        style={styles.icon}
                        size={34}
                        color="white"
                        name="settings"
                        onPress={openAndCloseModal}
                    />
                </Text>
            </>
        )
    } else {
        body = (
            <>
                <Text style={styles.icons}>
                    <MaterialIcons
                        style={styles.icon}
                        size={34}
                        color="white"
                        name="replay"
                        onPress={resetTimers}
                    />
                </Text>
                <Text style={styles.text}>Move {moveCounter}</Text>
                <Text style={styles.icons}>
                    <MaterialIcons
                        style={styles.icon}
                        size={34}
                        color="white"
                        name="pause"
                        onPress={pauseGame}
                    />
                </Text>
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
                            setTimers={setTimers}
                        />
                        <CustomButton
                            text="3/0"
                            time="3"
                            setTimers={setTimers}
                        />
                        <CustomButton
                            text="5/3"
                            time="5"
                            setTimers={setTimers}
                        />
                        <CustomButton
                            text="10/0"
                            time="10"
                            setTimers={setTimers}
                        />
                        <CustomButton
                            text="10/5"
                            time="15"
                            setTimers={setTimers}
                        />
                        <CustomButton
                            text="15/10"
                            time="30"
                            setTimers={setTimers}
                        />
                        <CustomButton
                            text="30/0"
                            time="30"
                            setTimers={setTimers}
                        />
                    </View>
                </View>
            </Modal>

            <Modal visible={showGames} animationType="none">
                <View style={styles.modal}>
                    <CustomButton text="Back" onPress={openAndCloseModal} />
                </View>
            </Modal>
            {body}
        </View>
    )
}

const styles = StyleSheet.create({
    timebutton: {
        backgroundColor: 'black',
    },
    menu: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    icon: {
        paddingHorizontal: 0,
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icons: {
        paddingHorizontal: 60,
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
        marginTop: 50,
        flex: 1,
        padding: 8,
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        //fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Inter_700Bold',
        color: 'white',
    },
    inputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //justifyContent: 'center',
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
