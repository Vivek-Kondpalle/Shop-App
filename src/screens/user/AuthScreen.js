import React, { useState, useReducer, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Button, ActivityIndicator, Alert } from 'react-native'
import LinearGradient from "react-native-linear-gradient"
import { useNavigation } from "@react-navigation/native"
import { useDispatch } from "react-redux"

import Input from "../../components/UI/Input"
import Colors from '../../constants/Colors'
import { login, signup } from "../../store/actions/auth"


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }

        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }

        let updatedFormIsValid = true;

        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }

        return {
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities
        }
    }

    return state;
}

const AuthScreen = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [isSignup, setIsSignup] = useState(false)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    })

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred', error, [{ text: 'Okay' }])
        }
    }, [error])

    const authHandler = async () => {
        let action;
        if (isSignup) {
            action = signup(formState.inputValues.email, formState.inputValues.password)
        } else {
            action = login(formState.inputValues.email, formState.inputValues.password)
        }

        setError(null)
        setIsLoading(true)
        try {
            await dispatch(action)
            navigation.navigate('Root')
        } catch (error) {
            setError(error.message)
            setIsLoading(false)
        }
    }

    const onInputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {

        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState])

    return (
        <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
            <View style={styles.screen}>
                <View style={styles.authContainer}>
                    <Input
                        id="email"
                        label="E-mail"
                        keyboard-type="email-address"
                        required
                        email
                        autoCapitalize="none"
                        errorText="Please enter a valid Email address!"
                        onInputChange={onInputChangeHandler}
                        initialValue=""
                    />
                    <Input
                        id="password"
                        label="Password"
                        keyboard-type="default"
                        secureTextEntry
                        required
                        minLength={5}
                        autoCapitalize="none"
                        errorText="Please enter a valid Password!"
                        onInputChange={onInputChangeHandler}
                        initialValue=""
                    />
                    <View style={styles.btnContainer}>
                        {
                            isLoading ?
                                <ActivityIndicator size="small" color={Colors.primary} />
                                :
                                < Button
                                    title={isSignup ? 'Sign Up' : 'LogIn'}
                                    onPress={authHandler}
                                    color={Colors.primary}
                                />
                        }
                    </View>
                    <View style={styles.btnContainer}>
                        <Button
                            title={isSignup ? "Switch to LogIn" : "Switch to Sign Up"}
                            onPress={() => {
                                setIsSignup(prevState => !prevState)
                            }}
                            color={Colors.accent}
                        />
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    screen: {
        // flex: 1,
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        backgroundColor: 'white',
        elevation: 10,
    },
    authContainer: {
        padding: 10,
    },
    btnContainer: {
        marginTop: 10
    }
})

export default AuthScreen

