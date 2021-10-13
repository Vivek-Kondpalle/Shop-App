import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import moment from "moment"

import Colors from '../../constants/Colors'
import CartItem from './CartItem'

const OrderItem = (props) => {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>₹ {props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{moment(props.date).format('MMM Do YYYY, hh:mm')}</Text>
            </View>
            <Button
                title={showDetails ? "Hide Details" : "Show Details"}
                color={Colors.primary}
                onPress={() => {
                    setShowDetails(!showDetails)
                }}
            />

            {showDetails && (
                <View style={styles.detailItems}>
                    {props.items.map(cartItem => (
                        <CartItem 
                        key={cartItem.productId}
                        quantity={cartItem.quantity}
                        amount={cartItem.sum}
                        title={cartItem.productTitle}
                        price={cartItem.productPrice}
                        />
                    ))}
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        elevation: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    date: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#888'
    },
    detailItems:{
        width: '100%'
    }
})

export default OrderItem

