import React, { useEffect, useState } from 'react';
import { fetchBoard, setDifficultyLevel, setStatus, solveBoard, validateBoard } from '../store/actions/board';
import { useDispatch, useSelector } from 'react-redux'
import Board from '../components/Board';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { addPlayerList, setPlayer } from '../store/actions/player';
import { Timer } from 'react-native-stopwatch-timer';

export default function Game({ navigation }) {
  const dispatch = useDispatch()
  const board = useSelector(state => state.board.board)
  const isLoading = useSelector(state => state.board.isLoading)
  const difficulty = useSelector(state => state.board.difficulty)
  const status = useSelector(state => state.board.status)
  const playerName = useSelector(state => state.player.name)

  const [isTimerStart, setIsTimerStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(600000);
  let currentTime

  useEffect(() => {
    dispatch(fetchBoard(difficulty))
  }, [dispatch, difficulty])

  useEffect(() => {
    if (!isLoading) {
      setIsTimerStart(true)
    }
  }, [isLoading])

  useEffect(() => {
    if (status === 'solved') {
      // let minutes = Math.floor(Math.round((timerDuration - currentTime) / 1000) / 60)
      // let seconds = Math.round((timerDuration - currentTime) / 1000) - minutes * 60
      // let totalTime = ''
      // console.log(minutes, 'minutesss');
      // minutes > 0 ? totalTime = `${minutes} m ${seconds} s` : totalTime = `${seconds} s`
      dispatch(addPlayerList({
        name: playerName,
        difficulty: difficulty,
        time: timerDuration - currentTime,
      }))
      setIsTimerStart(false)
      dispatch(setStatus(''))
      dispatch(setPlayer(''))
      dispatch(setDifficultyLevel(''))
      navigation.navigate('Finish')
    }
  }, [status])

  const handleValidate = () => {
    dispatch(validateBoard(board))
  }

  const handleSolve = () => {
    dispatch(solveBoard(board))
  }

  const renderItem = ({ item, index }) => (
    <Board rowItems={item} row={index}/>
  )

  function getFormattedTime(time) {
    currentTime = time
  }

  function handleTimerOut() {
    alert("Time is up!")
    navigation.navigate('Home')
  }

  return (
    <>
      {
        isLoading ?
          <View style={styles.boardContainer}>
            <ActivityIndicator size="large" />
          </View>
          :
          <>
          <View>
            <Timer
              totalDuration={timerDuration}
              msecs
              start={isTimerStart}
              options={options}
              handleFinish={() => {
                handleTimerOut()
              }}
              getMsecs={getFormattedTime}
            />
          </View>
          <View style={styles.boardContainer}>
              <FlatList
                contentContainerStyle={styles.flatListContainer}
                data={board}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => handleSolve()}
              style={styles.buttonSubmit}>
              <Text style={styles.buttonText}>Solve Board</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleValidate()}
              style={styles.buttonSubmit}>
              <Text style={styles.buttonText}>Validate Board</Text>
            </TouchableOpacity>
          </View>
          </>
      }
    </>
      
  )
}

const styles = StyleSheet.create({
  flatListContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  boardContainer: {
    flex: 2,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  buttonSubmit: {
    borderColor: 'black',
    borderWidth: 4,
    borderRadius: 9999,
    marginHorizontal: 10
  },
  buttonText: {
    padding: 10
  }
});

const options = {
  container: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
    display: 'hidden'
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  },
};