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
import { Stopwatch } from 'react-native-stopwatch-timer';


export default function Game({ navigation, route }) {
  const dispatch = useDispatch()
  const board = useSelector(state => state.board.board)
  const isLoading = useSelector(state => state.board.isLoading)
  const status = useSelector(state => state.board.status)
  const difficulty = route.params.difficulty
  const playerName = route.params.name
  const attempts = useSelector(state => state.player.attempts)

  const [isTimerStart, setIsTimerStart] = useState(false);
  const [timerReset, setTimerReset] = useState(false)
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
    // setTimerReset(true)
    // setIsTimerStart(!isTimerStart)
    if (status === 'solved') {
      dispatch(addPlayerList({
        name: playerName,
        difficulty: difficulty,
        time: currentTime,
      }))
      dispatch(setStatus(''))
      dispatch(setPlayer(''))
      dispatch(setDifficultyLevel(''))
      navigation.navigate('Finish', {
        name: playerName
      })
    }
  }, [status])

  useEffect(() => {
    if (status !== 'solved' && status !== '') {
      alert('Invalid board. Please check your board again.')
    }
  }, [attempts])

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
    setTimerReset(true)
    setIsTimerStart(false)
    navigation.navigate('Home')
  }

  function handleTimerReset() {
    setIsTimerStart(!isTimerStart)
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#B5EAEA', justifyContent: 'space-around'}}>
      {
        isLoading ?
          <View style={[styles.boardContainer, styles.fontColorBlack, { backgroundColor: "#EDF6E5" }]}>
            <ActivityIndicator size="large" />
          </View>
          :
          <View >
            <View style={{ alignItems: 'center'}}>
              <Stopwatch
                style={{ marginBottom: 50}}
                reset={timerReset}
                msecs
                start={isTimerStart}
                options={options}
                handleFinish={() => {
                    handleTimerOut()
                }}
                getMsecs={getFormattedTime}
              />
                <FlatList
                  contentContainerStyle={styles.flatListContainer}
                  data={board}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItem}
                />
              <View style={{ }}>
                <TouchableOpacity
                  onPress={() => handleSolve()}
                  style={styles.buttonSubmit}>
                  <Text style={[styles.buttonText, styles.fontColorBlack]}>Solve Board</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleValidate()}
                  style={styles.buttonSubmit}>
                  <Text style={[styles.buttonText, styles.fontColorBlack]}>Validate Board</Text>
                </TouchableOpacity>
              </View>
            </View>
        </View>
      }
    </View>
      
  )
}

const styles = StyleSheet.create({
  fontColorBlack: {
    color: '#444444'
  },
  flatListContainer: {
    justifyContent: 'center',
    marginVertical: 50,
  },
  boardContainer: {
    flex: 2,
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
    marginVertical: 10,
    backgroundColor: '#EDF6E5',
    alignItems: 'center'
  },
  buttonText: {
    padding: 10,
    fontWeight: 'bold'
  }
});

const options = {
  container: {
    backgroundColor: '#F38BA0',
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