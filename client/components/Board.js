import React from 'react'
import { useDispatch } from 'react-redux'
import { setInput } from '../store/actions/board'
import { 
  View,
  TextInput,
  StyleSheet
 } from 'react-native'

const Board = ({ rowItems, row }) => {

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
          if (e !== 0) {
            return (
              <TextInput 
              key={col}
              value={e.toString()}
              style={
                row == 2 || row == 5 ?
                    col == 2 || col == 5 ?
                      [styles.rightBorderThick, styles.bottomBorderThick]
                      :
                      styles.bottomBorderThick
                    :
                    col == 2 || col == 5 ?
                      styles.rightBorderThick
                      :
                      styles.borderRegular
                }
              editable={false}
              selectTextOnFocus={true}
            />
            )
          } else {
            return (
              <TextInput 
                key={col}
                keyboardType="numeric"
                style={
                  row == 2 || row == 5 ?
                    col == 2 || col == 5 ?
                      [styles.rightBorderThick, styles.bottomBorderThick]
                      :
                      styles.bottomBorderThick
                    :
                    col == 2 || col == 5 ?
                      styles.rightBorderThick
                      :
                      styles.borderRegular
                }
                onChangeText={num => handleChangeNumber(num, col)}
                editable={true}
                maxLength={1}
              />
            )
          }
        })
      }
    </View>
  )
}

export default Board

const styles = StyleSheet.create({
 bottomBorderThick: {
   borderBottomWidth: 3,
   borderWidth: 1,
   width: 35,
   height: 35,
   textAlign: 'center'
 },
 rightBorderThick: {
   borderRightWidth: 3,
   borderWidth: 1,
   width: 35,
   height: 35,
   textAlign: 'center'
 },
 borderRegular: {
   borderWidth: 1,
   width: 35,
   height: 35,
   textAlign: 'center'
 }
})