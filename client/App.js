import React from 'react';
import { Provider } from 'react-redux'
import store from './store';
import Game from './pages/Game';
import { SafeAreaView } from 'react-native'

export default function App() {

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Game />
      </SafeAreaView>
    </Provider>
  );
}
