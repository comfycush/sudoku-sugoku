import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView
} from 'react-native';
import { useSelector } from 'react-redux'
import { Table, Row, Rows } from 'react-native-table-component';

export default function Finish({ navigation }) {
  const playerList = useSelector(state => state.player.playerList)
  const [tableHead, setTableHead] = useState(['Player Name', 'Difficulty', 'Time'])

  const tableData = []
  for (let i = 0; i < playerList.length; i++) {
    const rowData = []
    for (let key in playerList[i]) {
      rowData.push(playerList[i][key])
    }
    tableData.push(rowData)
  }
  
  const sortedTableData = tableData.sort((a, b) => {
    return a[2] - b[2]
  })

  for (let i = 0; i < sortedTableData.length; i++) {
    let minutes = Math.floor(Math.round(sortedTableData[i][2] / 1000) / 60)
    let seconds = Math.round(sortedTableData[i][2] / 1000) - minutes * 60
    minutes > 0 ? 
      sortedTableData[i][2] = `${minutes} m ${seconds} s`
      :
      sortedTableData[i][2] = `${seconds} s`
  }

  return (
    <View style={[styles.container, styles.center]}>
        <View style={styles.praise}>
          <Text style={styles.congrats}>Congratulations!</Text>
          <Text style={styles.beat}>You have successfully beat the game</Text>
        </View>
        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
          <Row data={tableHead} widthArr={[110, 110, 110]} style={styles.tableHeader} textStyle={styles.tableText}/>
        </Table>
        <ScrollView style={styles.dataWrapper}>
          <Table style={{ height: 500 }}>
            {
              sortedTableData.map((rowData, index) => (
                <Row 
                  key={index}
                  data={rowData}
                  widthArr={[110, 110, 110]}
                  style={styles.row}
                  textStyle={styles.tableText}
                />
              ))
            }
          </Table>
        </ScrollView>
      <Button onPress={() => navigation.navigate('Home')} title="Play again" />
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  praise: {
    alignItems: 'center',
  },
  congrats: {
    fontSize: 40,
    marginBottom: 20
  },
  beat: {
    fontSize: 20,
  },
  tableHeader: {
    height: 50, backgroundColor: '#537791'
  },
  tableText: {
    textAlign: 'center', fontWeight: '100'
  },
  row: {
    height: 40,
    backgroundColor: '#fff'
  },
  dataWrapper: {
    marginTop: -1
  }
})