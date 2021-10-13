import React, {useEffect} from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from '@react-navigation/native'
import {useDispatch} from "react-redux"

import Colors from "../../constants/Colors"
import {authenticate} from "../../store/actions/auth"

const StartupScreen = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')
            if(!userData){
                navigation.reset({
                    index: 0,
                    routes: [{name: "AuthScreen"}]
                })

                return;
            }

            const transformedData = JSON.parse(userData)
            const {token, userId, expiryDate} = transformedData
            const expirationDate = new Date(expiryDate)

            if(expirationDate < new Date()){
                navigation.reset({
                    index: 0,
                    routes: [{name: "AuthScreen"}]
                })
                return;
            }

            navigation.navigate('Root')
            dispatch(authenticate(userId, token))
        }

        tryLogin()
    }, [])

    return (
        <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default StartupScreen

