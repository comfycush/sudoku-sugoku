import React from 'react'
import { useDispatch } from 'react-redux'
import { setInput } from '../store/actions/board'
import { 
  View,
  TextInput,
  StyleSheet,
  Dimensions
} from 'react-native'
import { useSelector } from 'react-redux'

const Board = ({ rowItems, row }) => {
  const originalBoard = useSelector(state => state.board.originalBoard)
  const dispatch = useDispatch()

  function handleChangeNumber(num, indexCol) {
    num = +num
    dispatch(setInput({
      num,
      row,
      col: indexCol
    }))
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {
        rowItems.map((e, col) => {
            return (
              <View
                style={
                    originalBoard[row][col] === 0 ?
                      styles.editable
                      :
                      styles.fixed}
                key={col}
                >
                <TextInput 
                  
                  keyboardType="numeric"
                  value={e === 0 ? '' : e.toString()}
                  style={[
                    styles.col,
                    styles.text,
                    col == 2 || col == 5 ?
                      styles.rightBorderThick
                      :
                      styles.borderRegular,
                    row == 2 || row == 5 ?
                      styles.bottomBorderThick
                      :
                      styles.borderRegular
                  ]}
                  onChangeText={num => handleChangeNumber(num, col)}
                  editable={originalBoard[row][col] === 0}
                  maxLength={1}
                />
              </View>
            )
        })
      }
    </View>
  )
}

export default Board

const styles = StyleSheet.create({
  col: {
    width: Dimensions.get('screen').width * 0.1,
    height: Dimensions.get('screen').width * 0.1,
    textAlign: 'center',
    borderWidth: 1,
  },
  fixed: {
    backgroundColor: '#FFBCBC'
  },
  editable: {
    backgroundColor: '#fff'
  },
  bottomBorderThick: {
    borderBottomWidth: 4,
    textAlign: 'center'
  },
  rightBorderThick: {
    borderRightWidth: 4,
    textAlign: 'center'
  },
  BottomBorderRegular: {
    textAlign: 'center'
  },
  rightBorderRegular: {
    textAlign: 'center'
  },
  text: {
    fontWeight: "bold"
  }
})