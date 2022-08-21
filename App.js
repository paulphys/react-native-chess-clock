import React, { useState, useEffect, useRef } from 'react'
import AppLoading from 'expo-app-loading'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Modal,
} from 'react-native'
import {
    useFonts,
    Inter_400Regular,
    Inter_700Bold,
} from '@expo-google-fonts/inter'
import Menu from './components/menu'
import { Timer } from './lib/timer'
import { Audio } from 'expo-av'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

export default function App() {
    const value = {
        variant: '1+0',
        white: 'naschira',
        black: 'paul',
        winner: 'white',
    }

    const postGame = async () => {
        try {
            await AsyncStorage.setItem(uuid.v4(), JSON.stringify(value))
        } catch (error) {
            console.log(error)
        }
    }

    /*
    const getAllGames = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);

            console.log(result[0])
        } catch (error) {
            console.error(error)
        }
    }
*/

    const getAllGames = async () => {
        try {
            const result: any = {}
            const keys = await AsyncStorage.getAllKeys()
            for (const key of keys) {
                const val = await AsyncStorage.getItem(key)
                result[key] = val
            }
            console.log(result[1])
        } catch (error) {
            alert(error)
        }
    }

    const sound = useRef(new Audio.Sound())

    useEffect(() => {
        return () => sound.current.unloadAsync()
    }, [])

    const playSound = async () => {
        const { sound: playbackObject } = await Audio.Sound.createAsync(
            require('./assets/clicky.wav')
        )
        sound.current = playbackObject
        const checkLoaded = await sound.current.getStatusAsync()
        if (checkLoaded.isLoaded != true) {
            console.log('error in loading sound')
        } else {
            await sound.current.playAsync()
        }
    }
    let winner = 'white'
    let pauser = 'white'
    let white_timer = 600000
    let black_timer = 600000
    let inc = 0

    const [isIncrement, setIncrement] = useState(inc)

    const [isPaused, setPaused] = useState(false)
    const [whoPaused, setwhoPaused] = useState(pauser)

    const [showModal, setShowModal] = useState(false)
    const [showGames, setGamesModal] = useState(false)

    const [whiteTimerDuration, setWhiteTimerDuration] = useState(white_timer)
    const [isWhiteTurn, setIsWhiteTurn] = useState(false)
    const [resetWhiteClock, setResetWhiteClock] = useState(false)

    const [blackTimerDuration, setBlackTimerDuration] = useState(black_timer)
    const [isBlackTurn, setIsBlackTurn] = useState(false)
    const [resetBlackClock, setResetBlackClock] = useState(false)

    const [showWhiteMs, setShowWhiteMs] = useState(false)
    const [showBlackMs, SetShowBlackMs] = useState(false)

    const [moveCounter, setMoveCounter] = useState(0)

    const setTimers = (whiteTimer, blackTimer, increment) => {
        white = parseInt(whiteTimer)
        black = parseInt(blackTimer)

        setWhiteTimerDuration(white)
        setBlackTimerDuration(black)

        setResetWhiteClock(true)
        setResetBlackClock(true)

        setIsBlackTurn(false)
        setIsWhiteTurn(false)

        setResetWhiteClock(false)
        setResetBlackClock(false)

        setShowModal(false)
        setGamesModal(false)

        setIsBlackTurn(false)
        setIsWhiteTurn(false)

        setResetWhiteClock(true)
        setResetBlackClock(true)

        setIncrement(increment)

        setMoveCounter(0)
    }

    const resetTimers = () => {
        if (isBlackTurn == true) {
            setIsBlackTurn(false)
            setResetBlackClock(true)
            setResetWhiteClock(true)
        } else if (isWhiteTurn == true) {
            setIsWhiteTurn(false)
            setResetBlackClock(true)
            setResetWhiteClock(true)
        } else {
            setIsBlackTurn(false)
            setIsWhiteTurn(false)
            setResetBlackClock(true)
            setResetWhiteClock(true)
        }
        setIsBlackTurn(false)
        setIsWhiteTurn(false)
        setWhiteTimerDuration(whiteTimerDuration)
        setBlackTimerDuration(blackTimerDuration)
        setIncrement(isIncrement)
        setMoveCounter(0)
    }

    const openAndCloseModal = () => {
        resetTimers()
        setShowModal(!showModal)
    }
    const openAndCloseGames = () => {
        setGamesModal(!showGames)
    }

    const handleWhitePress = () => {
        playSound()
        setResetWhiteClock(false)
        setResetBlackClock(false)
        setIsBlackTurn(true)
        setIsWhiteTurn(false)
    }

    const handleBlackPress = () => {
        playSound()
        setResetWhiteClock(false)
        setResetBlackClock(false)
        setIsWhiteTurn(true)
        setIsBlackTurn(false)
        setMoveCounter(moveCounter + 1)
    }

    const pauseGame = () => {
        if (!isPaused && isWhiteTurn) {
            setwhoPaused('white')
            setPaused(true)
            setIsBlackTurn(false)
            setIsWhiteTurn(false)
        }
        if (isPaused && whoPaused == 'white') {
            setPaused(false)
            setIsBlackTurn(false)
            setIsWhiteTurn(true)
        }
        if (!isPaused && isBlackTurn) {
            setwhoPaused('black')
            setPaused(true)
            setIsBlackTurn(false)
            setIsWhiteTurn(false)
        }
        if (isPaused && whoPaused == 'black') {
            setPaused(false)
            setIsBlackTurn(true)
            setIsWhiteTurn(false)
        }
    }

    const createThreeButtonAlert = (winner) =>
        Alert.alert('Time is up!', winner + ' wins', [
            {
                text: 'Close',
                onPress: () => {
                    resetTimers()
                },
            },
        ])

    const playClick = () => {
        useEffect(() => {
            playSound()
        })
    }

    let [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_700Bold,
    })

    if (!fontsLoaded) {
        return <AppLoading />
    }
    return (
        <View style={styles.container}>
            <View style={styles.blackField}>
                <TouchableOpacity
                    onPress={handleBlackPress}
                    style={styles.blackOpacity}
                    disabled={isWhiteTurn || isPaused}
                >
                    <Timer
                        totalDuration={whiteTimerDuration}
                        increment={isIncrement}
                        start={isBlackTurn}
                        reset={resetBlackClock}
                        options={blackFieldOptions}
                        handleFinish={() => {
                            winner = 'white'
                            createThreeButtonAlert(winner)
                        }}
                        getTime={(time) => {}}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.menu}>
                <Menu
                    showModal={showModal}
                    moveCounter={moveCounter}
                    openAndCloseModal={openAndCloseModal}
                    showGames={showGames}
                    openAndCloseGames={openAndCloseGames}
                    setTimers={setTimers}
                    resetTimers={resetTimers}
                    pauseGame={pauseGame}
                    isPaused={isPaused}
                    isBlackTurn={isBlackTurn}
                    isWhiteTurn={isWhiteTurn}
                    postGame={postGame}
                    getAllGames={getAllGames}
                />
            </View>
            <View style={styles.whiteField}>
                <TouchableOpacity
                    onPress={handleWhitePress}
                    style={styles.blackOpacity}
                    disabled={isBlackTurn || moveCounter == 0 || isPaused}
                >
                    <Timer
                        totalDuration={blackTimerDuration}
                        increment={isIncrement}
                        start={isWhiteTurn}
                        reset={resetWhiteClock}
                        options={whiteFieldOptions}
                        handleFinish={() => {
                            winner = 'Black'
                            createThreeButtonAlert(winner)
                        }}
                        getTime={(time) => {
                            //console.log(time)
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    blackField: {
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '180deg' }],
        flex: 5,
    },
    whiteField: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 5,
    },
    menu: {
        backgroundColor: '#252525',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    blackFieldText: {
        fontFamily: 'Inter_700Bold',
        color: 'white',
        fontSize: 70,
    },
    whiteFieldText: {
        fontFamily: 'Inter_700Bold',
        color: 'black',
        fontSize: 70,
    },
    whiteOpacity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    blackOpacity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
})

const whiteFieldOptions = {
    container: {
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Inter_700Bold',
        color: 'black',
        fontSize: 80,
    },
}

const blackFieldOptions = {
    container: {
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Inter_700Bold',
        color: 'white',
        fontSize: 80,
    },
}
