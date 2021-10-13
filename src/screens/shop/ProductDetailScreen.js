import React from 'react'
import { Button, Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import { useRoute } from "@react-navigation/native"
import { useSelector, useDispatch } from 'react-redux'

import Colors from "../../constants/Colors"
import { addToCart } from '../../store/actions/cart'

const ProductDetailScreen = () => {
    const { params } = useRoute()
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(product => product.id === params.productId)
    )
    const dispatch = useDispatch()

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <View style={styles.btnContainer}>
                <Button color={Colors.primary} title="Add To Cart" onPress={() => {
                    dispatch(addToCart(selectedProduct))
                }} />
            </View>
            <Text style={styles.price}>₹ {selectedProduct.price}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    btnContainer: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 20,
        color: '#888'
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 20
    }
})

export default ProductDetailScreen

