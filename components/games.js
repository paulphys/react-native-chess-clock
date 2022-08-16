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
import { Formik } from 'formik'
import * as yup from 'yup'
import CustomButton from '../components/button'
import Card from '../components/card'

const TimersSchema = yup.object().shape({
    whiteHoursTimer: yup
        .number()
        .integer()
        .min(0, 'Number too small')
        .max(11, 'Number too big')
        .typeError('Provide a positice number, less than 11'),
    whiteMinutesTimer: yup
        .number()
        .integer()
        .min(0, 'Number too small')
        .max(59, 'Number too big')
        .typeError('Provide a positice number, less than 60'),
    whiteSecondsTimer: yup
        .number()
        .integer()
        .min(0, 'Number too small')
        .max(59, 'Number too big')
        .typeError('Provide a positice number, less than 60'),
    blackHoursTimer: yup
        .number()
        .integer()
        .min(0, 'Number too small')
        .max(11, 'Number too big')
        .typeError('Provide a positice number, less than 11'),
    blackMinutesTimer: yup
        .number()
        .integer()
        .min(0, 'Number too small')
        .max(59, 'Number too big')
        .typeError('Provide a positice number, less than 60'),
    blackSecondsTimer: yup
        .number()
        .integer()
        .min(0, 'Number too small')
        .max(59, 'Number too big')
        .typeError('Provide a positice number, less than 60'),
})

export default function Games({
    showModal,
    openAndCloseModal,
    setTimers,
    resetTimers,
    moveCounter,
}) {
    return (
        <View style={styles.menu}>
            <KeyboardAvoidingView behavior="padding">
                <Modal visible={showModal} animationType="slide">
                    <View style={styles.modal}>
                        <View style={styles.container}>
                            <Formik
                                initialValues={{
                                    whiteHoursTimer: 0,
                                    whiteMinutesTimer: 0,
                                    whiteSecondsTimer: 0,
                                    blackHoursTimer: 0,
                                    blackMinutesTimer: 0,
                                    blackSecondsTimer: 0,
                                    showMoves: false,
                                }}
                                validationSchema={TimersSchema}
                                onSubmit={(values) => {
                                    let whiteTimer =
                                        values.whiteHoursTimer * 3600000 +
                                        values.whiteMinutesTimer * 60000 +
                                        values.whiteSecondsTimer * 1000
                                    let blackTimer =
                                        values.blackHoursTimer * 3600000 +
                                        values.blackMinutesTimer * 60000 +
                                        values.blackSecondsTimer * 1000
                                    setTimers(whiteTimer, blackTimer)
                                }}
                            >
                                {(props) => (
                                    <View>
                                        <Card>
                                            <Text style={styles.space}></Text>
                                            <Text style={styles.text}>
                                                Timer
                                            </Text>
                                            <View
                                                style={styles.inputsContainer}
                                            >
                                                <Text>H:</Text>
                                                <TextInput
                                                    placeholder="0"
                                                    textAlign={'center'}
                                                    onChangeText={props.handleChange(
                                                        'whiteHoursTimer'
                                                    )}
                                                    style={styles.input}
                                                    value={props.values.title} //?
                                                    keyboardType="numeric"
                                                />
                                                <Text>Min:</Text>
                                                <TextInput
                                                    placeholder="5"
                                                    textAlign={'center'}
                                                    onChangeText={props.handleChange(
                                                        'whiteMinutesTimer'
                                                    )}
                                                    style={styles.input}
                                                    value={props.values.title} //?
                                                    keyboardType="numeric"
                                                />
                                                <Text>Sec:</Text>
                                                <TextInput
                                                    placeholder="0"
                                                    textAlign={'center'}
                                                    onChangeText={props.handleChange(
                                                        'whiteSecondsTimer'
                                                    )}
                                                    style={styles.input}
                                                    value={props.values.title} //?
                                                    keyboardType="numeric"
                                                />
                                            </View>
                                            <Text style={styles.text}>
                                                Variants
                                            </Text>

                                            <Text style={styles.errorText}>
                                                {(props.touched
                                                    .whiteHoursTimer &&
                                                    props.errors
                                                        .whiteHoursTimer) ||
                                                    (props.touched
                                                        .whiteMinutesTimer &&
                                                        props.errors
                                                            .whiteMinutesTimer) ||
                                                    (props.touched
                                                        .whiteSecondsTimer &&
                                                        props.errors
                                                            .whiteSecondsTimer)}
                                            </Text>
                                        </Card>
                                        <Card>
                                            <Text style={styles.text}>
                                                Games
                                            </Text>
                                        </Card>
                                        <CustomButton
                                            text="Save changes"
                                            color="black"
                                            onPress={props.handleSubmit}
                                        />
                                        <Text style={styles.space}></Text>
                                        <CustomButton
                                            text="Close"
                                            color="red"
                                            onPress={openAndCloseModal}
                                        />
                                    </View>
                                )}
                            </Formik>
                        </View>
                    </View>
                </Modal>
            </KeyboardAvoidingView>

            <MaterialIcons
                style={styles.icon}
                size={37}
                color="#333"
                name="replay"
                onPress={resetTimers}
            />
            <Text style={styles.text}>
                {moveCounter == 0 ? (
                    <MaterialIcons
                        style={styles.icon}
                        size={38}
                        color="#333"
                        name="view-list"
                        onPress={openAndCloseModal}
                    />
                ) : (
                    'Move: ' + moveCounter
                )}
            </Text>
            <MaterialIcons
                style={styles.icon}
                size={35}
                color="#333"
                name="settings"
                onPress={openAndCloseModal}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    menu: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 2,
    },
    icon: {
        paddingHorizontal: 70,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        paddingTop: 2,
        borderRadius: 10,
        alignSelf: 'center',
    },
    modal: {
        flex: 1,
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
        flex: 1,
        padding: 16,
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        //fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Inter_700Bold',
        color: '#333',
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
