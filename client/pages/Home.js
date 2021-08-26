import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image
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
      navigation.navigate('Game', {
        name: playerName,
        difficulty: pickerValue
      })
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text
          style={[styles.title, styles.fontColorBlack]}
        >✨SUDOKU✨</Text>
        <Image 
          source={{
            uri: 'https://img.icons8.com/wired/64/000000/sudoku.png'
          }}
          style={{ width: 100, height: 100, marginBottom: 25 }}
        />
        <TextInput
          onChangeText={setPlayerName}
          style={styles.input} placeholder="Enter your name..."
        />
        <View style={{ width: 250, backgroundColor: '#fff' }}>
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
                  top: 15,
                  right: 15,
                }
            }}
            value={pickerValue}
            useNativeAndroidPickerStyle={false}
            textInputProps={{ underlineColor: 'yellow' }}
            Icon={() => {
              return <AntDesign name="down" size={18} color="black" />
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonSubmit}
          onPress={handleSubmitPlayer}
        >
          <Text style={[styles.buttonText, styles.fontColorBlack]}>Start Game</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B5EAEA'

  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: 250,
    textAlign: 'center',
    backgroundColor: '#fff'
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginVertical: 100,
    marginHorizontal: 25,
    borderRadius: 10,
    backgroundColor: '#F38BA0'
  },
  buttonSubmit: {
    borderColor: 'black',
    borderWidth: 4,
    borderRadius: 9999,
    marginTop: 50,
    backgroundColor: '#EDF6E5'
  },
  buttonText: {
    padding: 10,
    fontWeight: 'bold'
  },
  title: {
    marginBottom: 25,
    fontWeight: '500',
    fontSize: 30
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
  fontColorBlack: {
    color: '#444444'
  }
});