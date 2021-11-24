import React from 'react';
import { View, StyleSheet } from 'react-native';

const Cross = () => {
    return (
        <View style={styles.cross}>
        <View style={styles.crossLine}/>
        <View style={[styles.crossLine,styles.crossLine2]}/>
        </View>
    );
};
const styles = StyleSheet.create({
    crossLine:{
        position:'absolute',
        width:10,
        height:'100%',
        left:'45%',
        backgroundColor:'#ffffff',
        transform: [
          {
            rotate: "45deg",
          },
          
        ],
        borderRadius:5,
      },
      crossLine2:{
        transform: [
          {
            rotate: "-45deg",
          },
          
        ],
      },
      cross:{
        flex:1,
      },
});

export default Cross;
