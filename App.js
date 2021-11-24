import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, ImageBackground, Pressable, Alert } from 'react-native';
import bg from './assets/bg.jpeg';
import Cell from './src/components/Cell';
import Circle from './src/components/Circle';
import Cross from './src/components/Cross';

const emptyMap = [
  ['','','',], //1st row
  ['','','',], //2nd row
  ['','','',], //3rd row
  
];

const copyArray = (original) => {
  
  const copy = original.map((arr) => {
    return arr.slice();
  });
  
  return copy;

};


export default function App() {
  const [map, setMap] = useState(emptyMap);
  const [currentTurn, setCurrentTurn] = useState('x');
  const [gameMode, setGameMode] = useState('BOT_MEDIUM'); // LOCAL, BOT_EASY, BOT_MEDIUM

  useEffect(() => {
    if (currentTurn === 'o' && gameMode !== 'LOCAL') {
      botTurn();
    }
    
  }, [currentTurn, gameMode]);

  useEffect(() => {
    const winner = getWinner(map);
    if (winner) {
      gameWon(winner)
    }else {
      checkTieState();
    }
  }, [map]);

  const onPress = (rowIndex, columnIndex) => {
    
    if (map[rowIndex][columnIndex] !== "") {
      Alert.alert("Position already occupied");
      return;
    }

    setMap((existingMap) => {
      const updatedMap = [...existingMap];
      updatedMap[rowIndex][columnIndex] = currentTurn;
      return updatedMap;
    });

    setCurrentTurn(currentTurn === 'x' ? 'o' : 'x');



  };
  const getWinner = (winnerMap) => {
    // check rows
    for(let i = 0; i < 3; i++) {
      const isRowXWinning = winnerMap[i].every((cell) => cell === 'x');
      const isRowOWinning = winnerMap[i].every((cell) => cell === 'o');
      if (isRowXWinning) {
        return 'x';
        
      }
      if (isRowOWinning) {
        return 'o';
        
      }
    };
    // check columns
    for(let col = 0; col < 3; col++) {
      let isColumnXWinner = true;
      let isColumnOWinner = true;

      for(let row = 0; row < 3; row++) {
        if(winnerMap[row][col] !== 'x') {
          isColumnXWinner = false;
        }
        if(winnerMap[row][col] !== 'o') {
          isColumnOWinner = false;
        }
      }
      if (isColumnXWinner) {
        return 'x';
        
      }
      if (isColumnOWinner) {
        return 'o';
        
      }
    }

    // check diagonals
    let isDiagonal1OWinner = true;
    let isDiagonal1XWinner = true;
    let isDiagonal2OWinner = true;
    let isDiagonal2XWinner = true;
    for (let i = 0; i < 3; i++) {
      if(winnerMap[i][i] !== 'o') {
        isDiagonal1OWinner = false;
      }
      if(winnerMap[i][i] !== 'x') {
        isDiagonal1XWinner = false;
      }
      if(winnerMap[i][2 - i] !== 'o') {
        isDiagonal2OWinner = false;
      }
      if(winnerMap[i][2 - i] !== 'x') {
        isDiagonal2XWinner = false;
      }
    }
    if (isDiagonal1OWinner || isDiagonal2OWinner ) {
      return 'o';
      
    }
    if (isDiagonal1XWinner || isDiagonal2XWinner) {
      return 'x';
      
    }
  };

  const checkTieState = () => {
    if(!map.some(row => row.some(cell => cell === ''))) {
      Alert.alert(`It's a tie`, `tie`, [
        {
        text:'Restart',
        onPress:resetGame,
        }
    ]);
    }
  };


  const gameWon = (player) => {
    Alert.alert(`Huraaay`, `Player ${player} won`,[{
      text:'Restart',
      onPress:resetGame
    }]);
  };

  const resetGame = () => {
    setMap([
      ['','','',], //1st row
      ['','','',], //2nd row
      ['','','',], //3rd row
      
    ]);
    setCurrentTurn('x');
  };

  const botTurn = () => {
    // collect options
    const possiblePositions = [];
    map.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (cell === '') {
          possiblePositions.push({row: rowIndex, col: columnIndex});
        }
      });
    });
    let chosenOption;

    if (gameMode === 'BOT_MEDIUM') {
     // Attack

     possiblePositions.forEach((possiblePosition) => {
      const mapCopy = copyArray(map);
      mapCopy[possiblePosition.row][possiblePosition.col] = 'o';

      const winner = getWinner(mapCopy);
      if (winner === 'o') {
        // attack position
        chosenOption = possiblePosition;
      }

    });
  if (!chosenOption) {

    // defend
    // check if the opponent wins if it takes one of the positions

    possiblePositions.forEach((possiblePosition) => {
      const mapCopy = copyArray(map);
      mapCopy[possiblePosition.row][possiblePosition.col] = 'x';

      const winner = getWinner(mapCopy);
      if (winner === 'x') {
        // defend position
        chosenOption = possiblePosition;
      }

    });
   };
  };
   



    // choose random option
    if (!chosenOption) {
       chosenOption = possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
    }

    
    if (chosenOption) {
      onPress(chosenOption.row, chosenOption.col);
    }
    
  };


  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="contain">
        <Text style={styles.currenTTurn}>Current Turn: {currentTurn.toUpperCase()}</Text>
        <View style={styles.map}>

            {map.map((row, rowIndex ) => (
              <View key={`row-${rowIndex}`} style={styles.row}>
                {row.map((cell, columnIndex) => ( 
                  <Cell
                   cell={cell} 
                   onPress={() => onPress(rowIndex, columnIndex)} 
                   key={`row-${rowIndex}-col-${columnIndex}`}
                  />
                ))}
              </View>
              ))}
        </View>
        <View style={styles.buttons}>
          <Text onPress={() => setGameMode('LOCAL')}
            style={[styles.button,
             {backgroundColor: gameMode === 'LOCAL' ? '#4F5686' : '#191F24'}]}
             >Local
          </Text>
          <Text onPress={() => setGameMode('BOT_EASY')}
             style={[styles.button,
            {backgroundColor: gameMode === 'BOT_EASY' ? '#4F5686' : '#191F24'}]}>
              Easy Bot
          </Text>
          <Text onPress={() => setGameMode('BOT_MEDIUM')}
            style={[styles.button,
            {backgroundColor: gameMode === 'BOT_MEDIUM' ? '#4F5686' : '#191F24'}]}>
              Medium Bot
          </Text>

        </View>
      </ImageBackground>  
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  buttons:{
    position:'absolute',
    bottom:50,
    flexDirection:'row',
    
  },
  button:{
    color:'#ffffff',
    margin:15,
    fontSize:18,
    backgroundColor:'#191F24',
    padding:5,
    borderRadius:10,
    paddingHorizontal:5,
  },

  currenTTurn:{
    fontSize: 24,
    color:'#ffffff',
    marginBottom:'auto',
    marginTop:50,
    position:'absolute',
    top:0,
  },

  
  container: {
    flex: 1,
    backgroundColor: '#242D34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg:{
    width:'100%',
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:20,
  },
  
  map:{
    
    width:'80%',
    aspectRatio: 1,
    
  },

 
  row:{
    
    flex:1,
    flexDirection:'row',
    
  },
});
