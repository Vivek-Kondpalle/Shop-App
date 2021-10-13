import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import {useNavigation} from "@react-navigation/native"

import Colors from "../constants/Colors"
import UsersProductsScreen from "../screens/user/UsersProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

const Stack = createNativeStackNavigator();

function AdminNavigator(){
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
            name="Admin" 
            component={UsersProductsScreen} 
            options={{
                title: "Your Products",
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
                  ),
                headerRight: () => (
                  <MaterialCommunityIcons 
                  name="plus"
                  color={"white"}
                  size={24}
                  style={{marginRight: 5}}
                  onPress={() => {
                    navigation.navigate('EditProduct')
                  }}
                  />
                )
            }}
            />

            <Stack.Screen 
            name="EditProduct"
            component={EditProductScreen}
            options={({route}) => ({
              title: route.params?.productId ? 'Edit Product' : 'Add Product',
              headerRight: () => (
                <MaterialCommunityIcons 
                name="check"
                color={"white"}
                size={24}
                style={{marginRight: 5}}
                onPress={route.params?.submit}
                />
              )
            })}
            />
        </Stack.Navigator>
    )

}

export default AdminNavigator