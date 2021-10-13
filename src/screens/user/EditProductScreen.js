import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { ScrollView, StyleSheet, View, Alert, ActivityIndicator } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from "react-redux"
import { createProduct, updateProduct } from '../../store/actions/products'
import Input from "../../components/UI/Input"
import Colors from "../../constants/Colors"

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }

        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }

        let updatedFormIsValid = true;

        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }

        return {
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities
        }
    }

    return state;
}

const EditProductScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const navigation = useNavigation()
    const { params } = useRoute()
    const prodId = params?.productId

    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))
    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct?.title : '',
            imageUrl: editedProduct ? editedProduct?.imageUrl : '',
            description: editedProduct ? editedProduct?.description : '',
            price: '',
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false
    })

    const { inputValues: { title, imageUrl, description, price }, inputValidities, formIsValid } = formState

    useEffect(() => {
        if(error){
            Alert.alert('An error occurred!', error, [{text: 'okay'}])
        }
    }, [error])

    const submitHandler = useCallback(async () => {
        if (!formIsValid) {
            Alert.alert('Wrong Input', 'Please check the errors in the form.', [
                { text: 'Okay' }
            ])
            return;
        }

        setError(null)
        setIsLoading(true)

        try {
            if (editedProduct) {
               await dispatch(updateProduct(prodId, title, description, imageUrl))
            } else {
                await dispatch(createProduct(title, description, imageUrl, +price))
            }
            navigation.goBack()
        } catch (error) {
            setError(error.message)
        }
        
        setIsLoading(false)
    }, [dispatch, prodId, formState])

    useEffect(() => {
        navigation.setParams({ submit: submitHandler })
    }, [submitHandler])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {

        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState])

    if(isLoading){
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Input
                    id="title"
                    label="Title"
                    errorText="Please enter a valid Title!"
                    keyboardType="default"
                    autoCapitalize="sentences"
                    autoCorrect
                    returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.title : ''}
                    initiallyValid={!!editedProduct}
                    required
                />
                <Input
                    id="imageUrl"
                    label="Image Url"
                    errorText="Please enter a valid Image Url!"
                    onInputChange={inputChangeHandler}
                    keyboardType="default"
                    returnKeyType="next"
                    initialValue={editedProduct ? editedProduct.imageUrl : ''}
                    initiallyValid={!!editedProduct}
                    required
                />

                {editedProduct ? null :
                    <Input
                        id="price"
                        label="Price"
                        errorText="Please enter a valid Price!"
                        onInputChange={inputChangeHandler}
                        keyboardType="decimal-pad"
                        returnKeyType="next"
                        required
                        min={0.1}
                    />
                }
                <Input
                    id="description"
                    label="Description"
                    errorText="Please enter a valid Description!"
                    onInputChange={inputChangeHandler}
                    keyboardType="default"
                    autoCapitalize="sentences"
                    autoCorrect
                    multiline
                    numberOfLines={3}
                    initialValue={editedProduct ? editedProduct.description : ''}
                    initiallyValid={!!editedProduct}
                    required
                    minLength={5}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontWeight: 'bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    centered:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default EditProductScreen

