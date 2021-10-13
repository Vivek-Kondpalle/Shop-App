import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const CartItem = (props) => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity}</Text>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.amount}>₹ {props.amount.toFixed(2)}</Text>
                {props.deletable && <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <MaterialCommunityIcons name="delete" size={24} color="red" />
                </TouchableOpacity>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginHorizontal: 10,
        paddingVertical: 10
    },
    itemData:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity:{
        color: '#888',
        fontSize: 16,
        marginRight: 5,
        fontWeight: 'bold'
        
    },
    title:{
        // fontFamily: ''
        fontSize: 16,
        fontWeight: 'bold'
    },
    amount:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    deleteButton:{
        marginLeft: 20
    }
})

export default CartItem

