import React from 'react'
import {View} from 'react-native'
import { createStore } from 'redux'
import AddEntry from './components/AddEntry'
import { Provider } from 'react-redux'
import reducer from './reducers'

export default function App() {

  return (
    <Provider store={createStore(reducer)}>
      <View>
        <AddEntry />
      </View>
    </Provider>
  )
}
