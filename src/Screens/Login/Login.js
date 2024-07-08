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
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {increment} from '../../Redux/Slice/CounterSlice';
import {login} from '../../Redux/Slice/UserSlice';
import Maplepos from '../../Assets/Maplepos.png';

const Login = () => {
  const user = useSelector(state => state.user);
  console.log('user', user);

  const dispatch = useDispatch();
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
    console.log('body', body);
    await axios
      .post(`${baseUrl}/loginApi`, body, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      })
      .then(res => {
        console.log('res from axios', res.data.result);
        if (res.data.status === 200) {
          try {
            dispatch(
              login({
                token: res.data.token,
                email: res.data.result.email,
                profile_url: res.data.result.image,
                id: res.data.result.id,
                name: res.data.result.name,
                position: res.data.result.role,
                gender: res.data.result.gender,
                staff_id: res.data.result.staff_id,
              }),
            );

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
            Welcome to <Text style={{color: '#FF6D1A'}}>Maple</Text> Mart
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
