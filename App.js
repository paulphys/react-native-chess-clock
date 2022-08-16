import React, { useState, useEffect } from 'react'
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

export default function App() {
    const [sound, setSound] = useState()

    async function playSound() {
        console.log('Loading Sound')
        const { sound } = await Audio.Sound.createAsync(
            require('./assets/clicky.wav')
        )
        setSound(sound)

        console.log('Playing Sound')
        await sound.replayAsync()
    }
    useEffect(() => {
        return sound
            ? () => {
                  console.log('Unloading Sound')
                  sound.unloadAsync()
              }
            : undefined
    }, [sound])

    let winner = 'white'
    let white = 600000
    let black = 600000

    const [showModal, setShowModal] = useState(false)
    const [showGames, setGamesModal] = useState(false)

    const [whiteTimerDuration, setWhiteTimerDuration] = useState(white)
    const [isWhiteTurn, setIsWhiteTurn] = useState(false)
    const [resetWhiteClock, setResetWhiteClock] = useState(false)

    const [blackTimerDuration, setBlackTimerDuration] = useState(black)
    const [isBlackTurn, setIsBlackTurn] = useState(false)
    const [resetBlackClock, setResetBlackClock] = useState(false)

    const [showWhiteMs, setShowWhiteMs] = useState(false)
    const [showBlackMs, SetShowBlackMs] = useState(false)

    const [moveCounter, setMoveCounter] = useState(0)

    const setTimers = (whiteTimer, blackTimer) => {
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

        setMoveCounter(0)

        console.log(whiteTimerDuration)
        console.log(blackTimerDuration)
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
        setResetWhiteClock(false)
        setResetBlackClock(false)
        setIsBlackTurn(true)
        setIsWhiteTurn(false)
    }

    const playtheSound = () => {
        playSound()
    }

    const pauseGame = () => {
        setIsBlackTurn(false)
        setIsWhiteTurn(false)
        setMoveCounter(69)
    }

    const handleBlackPress = () => {
        setResetWhiteClock(false)
        setResetBlackClock(false)
        setIsWhiteTurn(true)
        setIsBlackTurn(false)
        setMoveCounter(moveCounter + 1)
    }

    const createThreeButtonAlert = (winner) =>
        Alert.alert('Time is up!', 'Winner: ' + winner, [
            {
                text: 'Okay',
                onPress: () => {
                    resetTimers()
                },
            },
        ])

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
                    disabled={isWhiteTurn}
                >
                    <Timer
                        totalDuration={whiteTimerDuration}
                        msecs={false}
                        start={isBlackTurn}
                        reset={resetBlackClock}
                        options={blackFieldOptions}
                        handleFinish={() => {
                            //white win
                            winner = 'white'
                            createThreeButtonAlert(winner)
                        }}
                        getTime={(time) => {
                            //console.log(time);
                        }}
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
                />
            </View>
            <View style={styles.whiteField}>
                <TouchableOpacity
                    onPress={handleWhitePress}
                    style={styles.blackOpacity}
                    disabled={isBlackTurn || moveCounter == 0}
                >
                    <Timer
                        totalDuration={blackTimerDuration}
                        msecs={false}
                        start={isWhiteTurn}
                        reset={resetWhiteClock}
                        options={whiteFieldOptions}
                        handleFinish={() => {
                            //black win
                            winner = 'black'
                            createThreeButtonAlert(winner)
                        }}
                        getTime={(time) => {
                            //console.log(time);
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
        //alignItems: 'center',
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
