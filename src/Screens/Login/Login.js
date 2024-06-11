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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    await axios
      .post(
        'http://128.199.127.121/api/customer/login',
        {email, password},
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
          },
        },
      )
      .then(res => {
        console.log('res', res.data.token);
        if (res) {
          try {
            AsyncStorage.setItem('token', res.data.token);
            console.log('result');
            navigation.navigate('Bottomnavigator', {
              screen: 'Home',
            });
            setEmail('');
            setPassword('');
          } catch (error) {
            console.log('error_in', error);
          }
        }
      });
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            Welcom from <Text style={{color: '#FF6D1A'}}>POS</Text> System
          </Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={email}
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#606F89"
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={password}
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#606F89"
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
    padding: wp('5%'),
  },
  inputView: {
    backgroundColor: '#FFFFFF',
    borderRadius: hp('2%'),
    elevation: 2,
    padding: wp('1%'),
    height: hp('6%'),
    marginVertical: hp('1%'),
  },
  TextInput: {
    flex: 1,
    marginHorizontal: wp('5%'),
    color: '#606F89',
    fontSize: hp('2%'),
    padding: wp('3%'),
    fontWeight: '500',
    fontFamily: 'DMSans',
  },

  loginBtn: {
    borderRadius: hp('2%'),
    paddingHorizontal: wp('20%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('5%'),
    backgroundColor: '#FF6D1A',
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: hp('2%'),
    padding: wp('3%'),
    fontWeight: '500',
    fontFamily: 'DMSans',
  },
  title: {
    fontSize: hp('3%'),
    fontFamily: 'DMSans',
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: '30%',
    color: '#000000',
  },
});
