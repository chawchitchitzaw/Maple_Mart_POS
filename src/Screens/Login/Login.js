import React, {useState} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    const {data} = await axios.post(
      'http://128.199.127.121/api/customer/login',
      {email, password},
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      },
    );

    if (data) {
      try {
        await AsyncStorage.setItem('token', data.token);
        navigation.navigate('Bottomnavigator', {
          screen: 'Home',
        });
        setEmail('');
        setPassword('');
      } catch (error) {
        console.log('error_in', error);
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text
            style={{
              fontSize: 30,
              fontFamily: 'DMSans',
              textAlign: 'center',
              marginBottom: 100,
              color: '#000000',
            }}>
            Welcom from <Text style={{color: '#FF6D1A'}}>POS</Text> System
          </Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={email}
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#9C9C9C"
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={password}
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#9C9C9C"
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    padding: 10,
  },
  inputView: {
    backgroundColor: '#E9E9E9',
    borderRadius: 30,
    height: 45,
    marginBottom: 20,
    // alignItems: 'center',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: '#9C9C9C',
    fontSize: 20,
  },

  loginBtn: {
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FF6D1A',
  },
  loginText: {
    color: '#ECECEC',
    fontSize: 20,
  },
});
