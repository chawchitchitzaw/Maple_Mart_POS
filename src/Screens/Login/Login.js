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
import {useDispatch, useSelector} from 'react-redux';
import {increment} from '../../Redux/Slice/CounterSlice';
import {login} from '../../Redux/Slice/UserSlice';

const Login = () => {
  const value = useSelector(state => state.counter);
  const dispatch = useDispatch();
  console.log('redux value', value);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const baseUrl = 'http://192.168.100.11/pos-backend/public/api';

  const handleLogin = async () => {
    const body = {
      email: email,
      password: password,
      token_name: 'login token',
    };
    console.log('body');
    await axios
      .post(`${baseUrl}/loginApi`, body, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      })
      .then(res => {
        console.log('res', res.data[0]);
        if (res.status == 200) {
          try {
            dispatch(
              login({
                token: res.data[0],
              }),
            );
            // AsyncStorage.setItem('token', res.data[0]);

            // console.log('result');
            // navigation.navigate('Bottomnavigator', {
            //   screen: 'Home',
            // });
            setEmail('');
            setPassword('');
          } catch (error) {
            console.log('error_in', error);
          }
        }
      });
  };
  // newjkllkfhgjukui

  // const handleLogin = async () => {
  //   console.log("api_fetching");

  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Accept", "*/*");
  //   // myHeaders.append(Authorization, 'Bare' + `${token}`)

  //   const raw = JSON.stringify({
  //     email: email,
  //     password: password,
  //   });

  //   const requestOptions = {
  //     method: "GET",
  //     headers:  { 'Content-Type': 'application/json'},
  //     body: raw,

  //   };

  //   fetch("http://192.168.100.11/pos-backend/public/api/loginApi", requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => {
  //       console.log("original_res", result);
  //       console.log("obj", JSON.parse(result));
  //       console.log("token", JSON.parse(result).token);
  //       console.log("userData", JSON.parse(result).customer);

  //       setToken(JSON.parse(result).token);
  //     })
  //     .catch((error) => console.error(error));
  // };

  // console.log("state_token", token);

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            Welcome from <Text style={{color: '#FF6D1A'}}>POS</Text> System
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
    elevation: 1,
    padding: wp('1%'),
    height: hp('7%'),
    marginVertical: hp('1%'),
  },
  TextInput: {
    flex: 1,
    marginHorizontal: wp('5%'),
    color: '#606F89',
    fontSize: hp('2%'),
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
