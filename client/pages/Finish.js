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

export default function Finish({ navigation, route }) {
  const playerList = useSelector(state => state.player.playerList)
  const [tableHead, setTableHead] = useState(['Player Name', 'Difficulty', 'Time'])
  const playerName = route.params.name

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
    <View style={[styles.container]}>
        <View style={styles.praise}>
          <Text style={[styles.congrats, styles.fontColorBlack]}>🎉 Congratulations! 🎉</Text>
          <Text style={[styles.fontColorBlack, styles.playerName]}>{playerName},</Text>
          <Text style={[styles.beat, styles.fontColorBlack]}>you successfully beat the game</Text>
          <Text style={[styles.fontColorBlack, styles.textLeaderboard]}>Leaderboard:</Text>
        </View>
        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
          <Row data={tableHead} widthArr={[110, 110, 110]} style={styles.tableHeader} textStyle={[styles.tableTextHeader,  styles.fontColorBlack]}/>
        </Table>
        <View style={{ height: 400 }}>
          <ScrollView style={styles.dataWrapper}>
            <Table>
              {
                sortedTableData.map((rowData, index) => (
                  <Row 
                    key={index}
                    data={rowData}
                    widthArr={[110, 110, 110]}
                    style={styles.row}
                    textStyle={[styles.tableText,  styles.fontColorBlack]}
                  />
                ))
              }
            </Table>
          </ScrollView>
        </View>
      <Button onPress={() => navigation.navigate('Home')} title="Play again" />
    </View>
  )
}

const styles = StyleSheet.create({
  fontColorBlack: {
    color: '#444444'
  },
  center: {
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#EDF6E5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  praise: {
    alignItems: 'center',
  },
  congrats: {
    fontSize: 38,
    marginBottom: 20
  },
  beat: {
    fontSize: 20,
    marginBottom: 25
  },
  tableHeader: {
    height: 50,
    backgroundColor: '#FFBCBC',    
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  tableTextHeader: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  tableText: {
    textAlign: 'center',
  },
  row: {
    height: 40,
    backgroundColor: '#fff'
  },
  dataWrapper: {
    marginTop: -1,
    height: 150
  },
  playerName: {
    fontSize: 20,
    marginBottom: 10
  },
  textLeaderboard: {
    marginBottom: 10,
    textDecorationLine: 'underline',
    fontSize: 15
  }
})