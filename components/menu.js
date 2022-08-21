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
import Games from '../components/games'

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
    setIncrement,
    postGame,
    getAllGames,
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
                        <MaterialIcons
                            style={styles.icon}
                            size={35}
                            color="white"
                            name="view-list"
                            onPress={openAndCloseGames}
                        />
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
                        <Text style={styles.variantText}>Bullet</Text>
                        <View style={styles.variants}>
                            <CustomButton
                                text="1+0"
                                time="1"
                                inc="0"
                                setTimers={setTimers}
                            />
                            <CustomButton
                                text="1+1"
                                time="1"
                                inc="1"
                                setTimers={setTimers}
                            />
                            <CustomButton
                                text="2+1"
                                time="2"
                                inc="1"
                                setTimers={setTimers}
                            />
                        </View>
                        <Text style={styles.variantText}>Blitz</Text>
                        <View style={styles.variants}>
                            <CustomButton
                                text="3+0"
                                time="3"
                                inc="0"
                                setTimers={setTimers}
                            />
                            <CustomButton
                                text="3+2"
                                time="3"
                                inc="2"
                                setTimers={setTimers}
                            />
                            <CustomButton
                                text="5+0"
                                time="5"
                                inc="0"
                                setTimers={setTimers}
                            />
                            <CustomButton
                                text="5+3"
                                time="5"
                                inc="3"
                                setTimers={setTimers}
                            />
                        </View>
                        <Text style={styles.variantText}>Rapid</Text>
                        <View style={styles.variants}>
                            <CustomButton
                                text="10+0"
                                time="10"
                                inc="0"
                                setTimers={setTimers}
                            />
                            <CustomButton
                                text="10+5"
                                time="10"
                                inc="5"
                                setTimers={setTimers}
                            />
                            <CustomButton
                                text="15+10"
                                time="15"
                                inc="10"
                                setTimers={setTimers}
                            />
                        </View>
                        <Text style={styles.variantText}>Classical</Text>
                        <View style={styles.variants}>
                            <CustomButton
                                text="30+0"
                                time="30"
                                inc="0"
                                setTimers={setTimers}
                            />
                            <CustomButton
                                text="30+20"
                                time="30"
                                inc="20"
                                setTimers={setTimers}
                            />
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={showGames} animationType="none">
                <View style={styles.modal}>
                    <View style={styles.container}>
                        <Text style={styles.h1}>Games</Text>
                        <Games getAllGames={getAllGames}/>
                        <Button title="Back" color="#04dbad" onPress={openAndCloseGames} />
                        <Button title="post game" onPress={postGame} />
                        <Button title="get all games" onPress={getAllGames} />
                    </View>
                </View>
            </Modal>
            {body}
        </View>
    )
}

const styles = StyleSheet.create({
    h1: {
        fontFamily: 'Inter_700Bold',
        color: 'white',
        fontSize: 50,
        alignSelf: "center"

    },
    variantText: {
        fontSize: 22,
        fontFamily: 'Inter_700Bold',
        color: '#04dbad',
        alignSelf: 'center',
    },
    variants: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
    container: {
        marginTop: 46,
        flex: 1,
        padding: 8,
    },
    text: {
        fontSize: 20,
        fontFamily: 'Inter_700Bold',
        color: 'white',
    },
    space: {
        fontSize: 4,
    },
})
