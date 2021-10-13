import 'react-native-gesture-handler';
import React from 'react'
import { View, Text } from 'react-native'
import { createStore, combineReducers, applyMiddleware } from "redux"
import ReduxThunk from "redux-thunk"
import { Provider } from "react-redux"
import { NavigationContainer } from '@react-navigation/native';
import {composeWithDevTools} from "redux-devtools-extension"

import productsReducer from "./src/store/reducers/products"
import cartReducer from "./src/store/reducers/cart"
import ordersReducer from "./src/store/reducers/orders"
import authReducer from './src/store/reducers/auth';
import ProductsNavigator from "./src/navigation/ShopNavigator"
import RootNavigator from './src/navigation/RootNavigator';
import MainNavigator from './src/navigation/MainNavigator';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
})

const middleware = [ReduxThunk]

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  )
}

export default App
