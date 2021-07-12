import React, { useState } from 'react'
import { 
  View,
  TextInput
 } from 'react-native'

const Board = ({ rowItems, row }) => {
  const data = {}
  for (let col = 0; col < rowItems.length; col++) {
    const [,] = useState(rowItems[col])
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {
        rowItems.map((e, index) => {
          return (
            <TextInput 
              key={index}
              value={e.toString()}
              keyboardType="numeric"
              style={{borderWidth: 1, width: 35, height:35, textAlign:"center"}}
              editable={e.toString() === '' ? true : false}
            />
          )
        })
      }
    </View>
  )
}

export default Board