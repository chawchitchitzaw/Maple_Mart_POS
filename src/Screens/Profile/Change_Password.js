import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import Back from '../../component/Back/Back';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

const Change_Password = () => {
  const [currentpassword, setCurrentPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const baseUrl = 'http://192.168.100.11/pos-backend/public/api';
  const id = useSelector(state => state.user.id);
  const handlesavebtn = async () => {
    const body = {
      user_id: id,
      old_pwd: currentpassword,
      new_pwd: newpassword,
      confirm_pwd: confirmpassword,
    };

    console.log('body from c p', body);
    await axios
      .post(`${baseUrl}/account/changePasswordApi`, body, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log('res from axios', res.data.status);
        if (res.data.status === true) {
          Alert.alert('Success', 'Password changed successfully');
          setConfirmPassword('');
          setCurrentPassword('');
          setNewPassword('');
        } else {
          Alert.alert('Failed', 'Failed to change password');
        }
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
      <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
            }}>
            <Back lable={'Change Password?'} />
            <View style={{marginTop: hp('3%')}}>
              <Text style={styles.txt1}>Current Password</Text>
              <View style={styles.box}>
                <TextInput
                  placeholder="Enter Current Password"
                  placeholderTextColor="#9C9C9C"
                  style={styles.write}
                  value={currentpassword}
                  onChangeText={setCurrentPassword}
                />
              </View>
            </View>
            <View style={{marginTop: hp('2%')}}>
              <Text style={styles.txt1}>New Password</Text>
              <View style={styles.box}>
                <TextInput
                  placeholder="Enter New Password"
                  placeholderTextColor="#9C9C9C"
                  style={styles.write}
                  value={newpassword}
                  onChangeText={setNewPassword}
                />
              </View>
            </View>
            <View style={{marginTop: hp('2%')}}>
              <Text style={styles.txt1}>Confirm Password</Text>
              <View style={styles.box}>
                <TextInput
                  placeholder="Enter New Password Again"
                  placeholderTextColor="#9C9C9C"
                  style={styles.write}
                  value={confirmpassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
            </View>

            <View style={{alignItems: 'flex-end', margin: wp('5%')}}>
              <TouchableOpacity style={styles.savebtn} onPress={handlesavebtn}>
                <Text style={styles.txt2}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Change_Password;

const styles = StyleSheet.create({
  txt1: {
    fontSize: hp('2.4%'),
    fontWeight: '500',
    fontFamily: 'DMSans',
    marginHorizontal: wp('5%'),
    color: '#000000',
  },
  txt2: {
    fontSize: hp('2%'),
    fontWeight: '500',
    fontFamily: 'DMSans',
    color: '#fff',
  },
  box: {
    backgroundColor: '#FFFFFF',
    padding: wp('1%'),
    borderRadius: hp('2%'),
    marginHorizontal: wp('5%'),
    marginVertical: hp('1%'),
    elevation: 1,
  },
  write: {
    fontSize: hp('1.8%'),
    marginHorizontal: wp('1%'),
    fontFamily: 'DMSans',
  },
  savebtn: {
    width: wp('25%'),
    height: hp('5%'),
    backgroundColor: '#FF6D1A',
    borderRadius: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
