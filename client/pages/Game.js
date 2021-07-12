import React, { useEffect } from 'react';
import { fetchBoard, solveBoard, validateBoard } from '../store/actions/board';
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


export default function Game() {
  const dispatch = useDispatch()
  const board = useSelector(state => state.board.board)
  const isLoading = useSelector(state => state.board.isLoading)

  useEffect(() => {
    dispatch(fetchBoard())
  }, [dispatch])

  const handleValidate = () => {
    dispatch(validateBoard(board))
  }

  const handleSolve = () => {
    dispatch(solveBoard(board))
  }

  const renderItem = ({ item, index }) => (
    <Board rowItems={item} row={index}/>
  )

  return (
    <>
      {
        isLoading ?
          <View style={styles.boardContainer}>
            <ActivityIndicator size="large" />
          </View>
          :
          <>
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
    justifyContent: 'center'

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