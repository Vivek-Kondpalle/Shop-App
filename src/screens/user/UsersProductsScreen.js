import React from 'react'
import { StyleSheet, Text, View, FlatList, Button, Alert } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import {useNavigation} from "@react-navigation/native"

import ProductItem from "../../components/shop/ProductItem"
import Colors from "../../constants/Colors"
import { deleteProduct } from '../../store/actions/products'

const UsersProductsScreen = () => {
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const editProductHandler = (id) => {
        navigation.navigate('EditProduct', {
            productId: id
        })
    }

    const deleteHandler = (id) => {
        console.log("id", id)
        Alert.alert('Are you sure?', 'Do you really want to delete this item?',
            [{text: 'No', style:'default'},
            {
                text: 'Yes',
                style: 'destructive',
                onPress: () => {
                    dispatch(deleteProduct(id))
                }
            }]
        )
    }

    if(userProducts.length === 0){
        return (
            <View style={styles.centered}>
                <Text>No products created</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        editProductHandler(itemData.item.id)
                    }}
                >
                    <Button
                        color={Colors.primary}
                        title='Edit'
                        onPress={() => {
                            editProductHandler(itemData.item.id)
                        }}
                    />

                    <Button
                        color={Colors.primary}
                        title='Delete'
                        onPress={() => {
                            deleteHandler(itemData.item.id)
                        }}
                    />
                </ProductItem>
            )}
        />
    )
}

const styles = StyleSheet.create({
    centered:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    }
})

export default UsersProductsScreen

