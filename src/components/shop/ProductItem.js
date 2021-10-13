import React from 'react'
import { Button, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import Colors from "../../constants/Colors"

const ProductItem = (props) => {
    
    return (
        <TouchableOpacity onPress={props.onSelect} useForeground>
            <View style={styles.product}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: props.image }} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>₹ {props.price.toFixed(2)}</Text>
                </View>
                <View style={styles.actions}>
                   {props.children}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    product: {
        elevation: 7,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 5
    },
    imageContainer: {
        height: '60%',
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: "#888"
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }
})

export default ProductItem

