import React from 'react';
import { View, StyleSheet} from 'react-native';

const Circle = () => {
    return (
        <View style={styles.circle}/>
    )
};
const styles = StyleSheet.create({
    circle:{
        flex:1,
        borderRadius:60,
        alignItems: 'center',
        justifyContent: 'center',
        margin:10,
        borderWidth:8,
        borderColor:'#ffffff',
      },
});

export default Circle;
