import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import {useNavigation} from "@react-navigation/native"

import OrdersScreen from "../screens/shop/OrdersScreen"
import Colors from "../constants/Colors"

const Stack = createNativeStackNavigator();

function OrdersNavigator(){
    const navigation = useNavigation()
    return (
        <Stack.Navigator
        screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary
            },
            headerTintColor: 'white',
          }}  
        >
            <Stack.Screen 
            name="Orders" 
            component={OrdersScreen} 
            options={{
                headerLeft: () => (
                    <MaterialCommunityIcons 
                    name="menu"
                    color={"white"}
                    size={24}
                    style={{marginRight: 5}}
                    onPress={() => {
                      navigation.toggleDrawer()
                    }}
                    />
                  )
            }}
            />
        </Stack.Navigator>
    )

}

export default OrdersNavigator