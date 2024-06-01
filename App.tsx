import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './navigationContainer/AppNavigator'
import { Provider } from 'react-redux'
import MyStore from './redux/MyStore'

const App = () => {
  return (
    <Provider store={MyStore}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  )
}

export default App

