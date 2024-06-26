// App.js
import React from 'react';
import { StyleSheet, View,SafeAreaView,Text,TouchableOpacity } from 'react-native';
import BarcodeScanner from './BarcodeScanner';

const Barcode = () => {
  return (
    
    <View style={styles.container}>
      <BarcodeScanner style={{}}/>
      <TouchableOpacity style={styles.touch}>
      <Text style={styles.txtbottom}>List</Text>
      </TouchableOpacity>
    </View>
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //bottom:15,
  },
  txtbottom:{
    paddingTop:9,
    alignItems:'center',
    justifyContent:'center',
    position: 'absolute',
    bottom: 0,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    backgroundColor:'#FF6D1A',
    height:50,
    fontWeight:'800',
    
  },
  touch:{
  //backgroundColor:'orange',
  },  
  
});

export default Barcode;
