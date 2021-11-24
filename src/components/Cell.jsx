import React from 'react';
import { View, Text, StyleSheet,Pressable } from 'react-native';
import Cross from './Cross';
import Circle from './Circle';

const Cell = (props) => {
    const {cell, onPress} = props;

    return (
        <Pressable           
            style={styles.cell} 
            onPress={() => onPress()}
            >
            {cell === 'o' && 
                <Circle/>
            }
            {cell === 'x' && 
                <Cross/>
            }
        </Pressable>
    )
};
const styles = StyleSheet.create ({
    cell:{
        flex:1,
        
        width:100,
        height:100,
      },
});


export default Cell;
