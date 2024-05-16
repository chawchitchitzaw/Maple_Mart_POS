import React, { useState } from 'react'
import axios from 'axios';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
  } from "react-native";
  import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

  

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation()
   

   const handleLogin = async() => {
   
    
      const {data} = await axios.post(
        'http://128.199.127.121/api/customer/login',
        {email,
          password,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
          },
        },
      );
      
     
  if(data){
        try {
          await AsyncStorage.setItem('token',data.token);
          navigation.navigate('Home');
          setEmail('')
    setPassword('')
        } 
        catch (error) {
          console.log('error_in',error)
        }
      }

   }

   
  return (
    <>
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../Assets/supermarket.png')} /> 
      <View style={styles.inputView}>
        <TextInput
          value={email}
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={setEmail}
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
        value={password}
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={setPassword}
        /> 
      </View> 
      
      <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
        <Text style={styles.loginText}>Login</Text> 
      </TouchableOpacity> 


     
    </View> 
        </>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffff",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      marginBottom: 40,
    },
    inputView: {
      backgroundColor: "#82EEFD",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
    },
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
    },
    
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#63C5DA",
    },
  });
