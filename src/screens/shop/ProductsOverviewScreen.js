import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, Button, FlatList, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import { useNavigation, useFocusEffect } from "@react-navigation/native"

import ProductItem from '../../components/shop/ProductItem'
import { addToCart } from '../../store/actions/cart'
import { fetchProducts } from '../../store/actions/products'
import Colors from "../../constants/Colors"

const ProductsOverviewScreen = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState()
    const products = useSelector(state => state.products.availableProducts)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const loadProducts = useCallback(async () => {
        setError(null)
        setIsRefreshing(true)
        try {
            await dispatch(fetchProducts())
        } catch (error) {
            setError(error.message)
        }
        setIsRefreshing(false)
    }, [dispatch, setIsRefreshing, setError])

    // useEffect(() => {
    //     const willFocusSub = navigation.addListener('focus', loadProducts)

    //     return willFocusSub

    // }, [loadProducts])

    useFocusEffect(useCallback(() => {
        setIsLoading(true)
        loadProducts().then(() => setIsLoading(false))
    }, [loadProducts, setIsLoading])
    )

    const selectItemHandler = (id, title) => {
        navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title
        })
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>{error}</Text>
                <Button title="Try Again" onPress={loadProducts} color={Colors.primary} />
            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator color={Colors.primary} size='large' />
            </View>
        )
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found. Maybe start adding some!</Text>
            </View>
        )
    }

    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => { selectItemHandler(itemData.item.id, itemData.item.title) }}
                >
                    <Button
                        color={Colors.primary}
                        title='View Details'
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title)
                        }}
                    />

                    <Button
                        color={Colors.primary}
                        title='To Cart'
                        onPress={() => {
                            dispatch(addToCart(itemData.item))
                        }}
                    />

                </ProductItem>
            )}
        />
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProductsOverviewScreen

