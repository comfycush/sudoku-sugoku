import React from 'react';
import { Provider } from 'react-redux'
import store from './store';
import Game from './pages/Game';
import Home from './pages/Home';
import Finish from './pages/Finish';
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen
            name="Finish"
            component={Finish} 
            options={{
              headerLeft: () => {
                return null;
              },
              gestureEnabled: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}