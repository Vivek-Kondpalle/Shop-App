import React, {useEffect, useState, useCallback} from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import {fetchOrders} from "../../store/actions/orders"

import OrderItem from '../../components/shop/OrderItem'
import Colors from '../../constants/Colors'

const OrdersScreen = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const orders = useSelector(state => state.orders.orders)
    const dispatch = useDispatch()

    const loadOrders = useCallback(async () => {
        setError(null)
        setIsLoading(true)
        try {
            await dispatch(fetchOrders())
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false)
    }, [dispatch, setError, setIsLoading])

    useEffect(() => {
        loadOrders()
    }, [loadOrders])

    if(error){
        return (
            <View style={styles.centered}>
                <Text>{error}</Text>
                <Button title="Try Again" onPress={loadOrders} color={Colors.primary} />
            </View>
        )
    }

    if(isLoading){
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }

    if(orders.length === 0){
        return (
            <View style={styles.centered}>
                <Text>No orders yet!</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <OrderItem
                    items={itemData.item.items}
                    amount={itemData.item.totalAmount}
                    date={itemData.item.date}
                />
            )}
        />
    )
}

const styles = StyleSheet.create({
    centered:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OrdersScreen

