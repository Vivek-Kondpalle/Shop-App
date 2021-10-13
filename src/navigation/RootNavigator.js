import React from "react"
import { Button } from "react-native"
import { createDrawerNavigator, DrawerItemList, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from "@react-navigation/native"
import {useDispatch} from "react-redux"

import ShopNavigator from "./ShopNavigator"
import OrderNavigator from "./OrderNavigator"
import Colors from "../constants/Colors";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import AdminNavigator from "./AdminNavigator";
import {logout} from "../store/actions/auth"

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const dispatch = useDispatch()

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Button
        title="Logout"
        onPress={() => {
          // console.log("props", props)
          dispatch(logout())
          props.navigation.reset({
            index: 0,
            routes: [{name: 'AuthScreen'}]
          })
        }}
        color={Colors.primary}
      />
    </DrawerContentScrollView>
  )
}

function RootNavigator() {
  const navigation = useNavigation()
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="ProductDrawer"
        component={ShopNavigator}
        options={{
          title: 'Products',
          drawerActiveTintColor: Colors.primary,
          drawerIcon: (drawerConfig) => (
            <MaterialCommunityIcons
              name="cart"
              size={20}
            />
          )
        }}
      />

      <Drawer.Screen
        name="OrdersDrawer"
        component={OrderNavigator}
        options={{
          title: 'Orders',
          drawerActiveTintColor: Colors.primary,
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              size={20}
            />
          )
        }}
      />

      <Drawer.Screen
        name="UserProductsDrawer"
        component={AdminNavigator}
        options={{
          title: 'User Products',
          drawerActiveTintColor: Colors.primary,
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={20}
            />
          )
        }}
      />

    </Drawer.Navigator>
  )
}

export default RootNavigator