import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HeaderButton } from "react-navigation-header-buttons"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const CustomHeaderButton = (props) => {
    return (
        <HeaderButton
            {...props}
            IconComponent={MaterialCommunityIcons}
            iconSize={26}
            color={'white'}
        />
    )
}

const styles = StyleSheet.create({})

export default CustomHeaderButton

