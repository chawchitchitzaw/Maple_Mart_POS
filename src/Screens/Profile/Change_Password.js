import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Back from '../../component/Back/Back';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Change_Password = () => {
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
            <View style={{marginTop:hp('3%')}}>
              <Text style={styles.txt1}>Current Password</Text>
              <View style={styles.box}>
                <TextInput
                  placeholder="Enter Current Password"
                  placeholderTextColor="#9C9C9C"
                  style={styles.write}
                />
              </View>
            </View>
            <View style={{marginTop:hp('2%')}}>
              <Text style={styles.txt1}>New Password</Text>
              <View style={styles.box}>
                <TextInput
                  placeholder="Enter New Password"
                  placeholderTextColor="#9C9C9C"
                  style={styles.write}
                />
              </View>
            </View>
            <View style={{marginTop:hp('2%')}}>
              <Text style={styles.txt1}>Confirm New Password</Text>
              <View style={styles.box}>
                <TextInput
                  placeholder="Enter New Password Again"
                  placeholderTextColor="#9C9C9C"
                  style={styles.write}
                />
              </View>
            </View>

            <View style={{alignItems: 'flex-end', margin: wp('5%')}}>
              <TouchableOpacity style={styles.savebtn}>
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
    color: '#000000',
  },
  box: {
    backgroundColor: '#FFFFFF',
    padding: wp('1%'),
    borderWidth: 1,
    borderRadius: hp('2%'),
    marginHorizontal: wp('5%'),
    marginVertical: hp('1%'),
  },
  write: {
    fontSize: hp('1.8%'),
    marginHorizontal:wp('1%'),
    fontFamily: 'DMSans',
  },
  savebtn: {
    width: wp('25%'),
    height: hp('5%'),
    backgroundColor: '#FED8B1',
    borderRadius: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
