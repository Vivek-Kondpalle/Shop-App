import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import {useNavigation} from "@react-navigation/native"

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from "../constants/Colors"
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";

const Stack = createNativeStackNavigator();

function ProductsNavigator() {
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
        name="Products"
        component={ProductsOverviewScreen}
        options={{
          title: "All Products",
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
            name="cart" 
            size={24} 
            color={'white'} 
            onPress={() => {
              navigation.navigate('Cart')
            }} 
            />
          )
        }}
      />
      
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({ title: route.params.productTitle })}
      />

      <Stack.Screen 
        name="Cart"
        component={CartScreen}
      />
    </Stack.Navigator>
  );
}

export default ProductsNavigator