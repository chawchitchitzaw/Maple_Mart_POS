// App.js
import React from 'react';
import { StyleSheet, View,SafeAreaView,Text,TouchableOpacity } from 'react-native';
import BarcodeScanner from './BarcodeScanner';
import {useNavigation} from '@react-navigation/native';

const Barcode = () => {
  const navigation = useNavigation();
  return (
    
    <View style={styles.container}>
      <BarcodeScanner style={{}}/>
      <TouchableOpacity style={styles.touch} onPress={() => navigation.goBack()}>
      <Text style={styles.txtbottom}>Cart</Text>
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
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontWeight:'800',
  },
  touch:{
  //backgroundColor:'orange',paddingTop:9,
    alignItems:'center',
    justifyContent:'center',
    position: 'absolute',
    bottom: 0,
    
    
    width: '100%',
    backgroundColor:'#FF6D1A',
    height:50,
    
  },  
  
});

export default Barcode;
