import React from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import { useSelector, useDispatch } from "react-redux"

import Colors from "../../constants/Colors"
import CartItem from "../../components/shop/CartItem"
import { removeFromCart } from '../../store/actions/cart'
import { addOrder } from '../../store/actions/orders'

const CartScreen = () => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    const cartItems = useSelector(state => {
        const transformedCartItems = []
        for(const key in state.cart.items){
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }

        return transformedCartItems.sort((a,b) => a.productId > b.productId ? 1 : -1)
    })

    const dispatch = useDispatch()

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>₹ {Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                <Button 
                color={Colors.primary} 
                title="Order Now" 
                disabled={cartItems.length === 0}
                onPress={() => {
                    dispatch(addOrder(cartItems, cartTotalAmount))
                }}
                />
            </View>
            <View>
                <FlatList 
                    data={cartItems}
                    keyExtractor={item => item.productId}
                    renderItem={itemData => (
                    <CartItem 
                        quantity={itemData.item.quantity}
                        price={itemData.item.productPrice}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={() => {
                            dispatch(removeFromCart(itemData.item.productId))
                        }}
                    />
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 10
    },
    summaryText:{
        fontSize: 18,
        fontWeight: 'bold'
    },
    amount:{
        color: Colors.primary,
        fontWeight: 'bold'
    }
})

export default CartScreen

