import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { fetchBoard } from '../store/actions/board';
import { useDispatch, useSelector } from 'react-redux'
import Board from '../components/Board';


export default function Game() {
  const dispatch = useDispatch()
  const board = useSelector(state => state.board.board.board)
  const isLoading = useSelector(state => state.board.isLoading)

  useEffect(() => {
    dispatch(fetchBoard())
  }, [dispatch])

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
          <View style={styles.boardContainer}>
              <FlatList
                data={board}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
          </View>
      }
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => alert('Hello, world!')}
          style={styles.buttonSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  boardContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'

  },
  buttonSubmit: {
    borderColor: 'black',
    borderWidth: 4,
    borderRadius: 9999
  },
  buttonText: {
    padding: 10
  }
});