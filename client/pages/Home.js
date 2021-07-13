import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'
import { setPlayer } from '../store/actions/player';
import { setDifficultyLevel } from '../store/actions/board';

export default function Home({ navigation }) {
  const dispatch = useDispatch()
  const [playerName, setPlayerName] = useState('')
  const [pickerValue, setPickerValue] = useState('')

  function handleSubmitPlayer() {
    if (!playerName) {
      alert('Player name is required');
    } else if (['easy', 'medium', 'hard'].includes(pickerValue) == false) {
      alert('Please select difficulty level');
    } else {
      dispatch(setPlayer(playerName))
      dispatch(setDifficultyLevel(pickerValue))
      navigation.navigate('Game')
    }
  }

  return (
    <View style={styles.card}>
      <Text
        style={styles.title}
      >SUDOKU</Text>
      <TextInput
        onChangeText={setPlayerName}
        style={styles.input} placeholder="Enter your name..."
      />
      <View style={{ width: 250 }}>
        <RNPickerSelect 
          placeholder={{ label: "Select difficulty level", value: null }}
          onValueChange={(value) => setPickerValue(value)}
          items={[
            { label: "Easy", value: "easy" },
            { label: "Medium", value: "medium" },
            { label: "Hard", value: "hard" }
          ]}
          style={{ ...pickerSelectStyles,
            iconContainer: {
                top: 10,
                right: 15,
              }
          }}
          value={pickerValue}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ underlineColor: 'yellow' }}
          Icon={() => {
            return <AntDesign name="down" size={24} color="black" />
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonSubmit}
        onPress={handleSubmitPlayer}
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: 250,
    textAlign: 'center'
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginVertical: 100,
    marginHorizontal: 25,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  buttonSubmit: {
    borderColor: 'black',
    borderWidth: 4,
    borderRadius: 9999,
    marginTop: 50
  },
  buttonText: {
    padding: 10
  },
  title: {
    marginBottom: 150
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    textAlign: 'center'
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});