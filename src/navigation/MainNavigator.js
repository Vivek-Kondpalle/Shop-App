import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useNavigation} from "@react-navigation/native"
import AuthScreen from "../screens/user/AuthScreen";
import RootNavigator from "./RootNavigator";
import StartupScreen from "../screens/user/StartupScreen";

const Stack = createNativeStackNavigator();

function MainNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="StartupScreen" 
            component={StartupScreen} 
            options={{
                headerShown: false
            }}
            />
            
            <Stack.Screen 
            name="AuthScreen" 
            component={AuthScreen} 
            options={{
                title:"Authenticate"
            }}
            />

            <Stack.Screen 
            name="Root" 
            component={RootNavigator} 
            options={{
                headerShown: false
            }}
            />
        </Stack.Navigator>
    )
}

export default MainNavigator