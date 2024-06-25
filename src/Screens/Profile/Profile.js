import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import React from 'react';
import lady from '../../Assets/lady.png';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Profilelist from '../../component/Profile/Profilelist';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import {logout} from '../../Redux/Slice/UserSlice';

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const twoOptionAlert = () => {
    Alert.alert('Log out of your account?', '', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('Cancel');
        },
      },
      {
        text: 'Ok',
        onPress: () => {
          dispatch(logout());
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
      <TouchableOpacity onPress={() => navigation.navigate('View_Profile')}>
        <ImageBackground
          source={require('../../Assets/backgound.jpg')}
          resizeMode="cover">
          <Text style={styles.title}>Profile</Text>
          <View style={styles.imgtxt}>
            <View style={styles.imageborder}>
              <Image
                source={lady}
                style={{height: '80%', width: '80%'}}
                resizeMode="contain"
              />
            </View>
            <View style={{flex: 1, marginHorizontal: wp('5%')}}>
              <Text style={styles.txt1}>Chaw Chit Chit Zaw</Text>
              <Text style={styles.txt2}>Manager</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <View style={{paddingVertical: hp('5%')}}>
          <Profilelist icon="edit" lable="Edit Profile" goto="Edit_Profile" />
          <Profilelist
            icon="lock"
            lable="Change Password"
            goto="Change_Password"
          />
        </View>

        <View style={{alignItems: 'center', marginVertical: hp('5%')}}>
          <TouchableOpacity style={styles.tail} onPress={twoOptionAlert}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '60%',
                borderColor:'red',
              }}>
              <Image
                source={require('../../Assets/logout.png')}
                style={{
                  height: hp('3%'),
                  width: wp('5%'),
                }}
              />
              <Text style={styles.txt3}>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
const styles = StyleSheet.create({
  header: {
    width: wp('100%'),
    height: hp('20%'),
    justifyContent: 'flex-end',
    backgroundColor: 'yellow',
  },
  title: {
    fontSize: hp('3.5%'),
    fontFamily: 'DMSans',
    fontWeight: '500',
    color: '#FAFAFA',
    textAlign: 'center',
    marginHorizontal: hp('1%'),
  },
  tail: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('2%'),
    borderWidth: 2,
    borderColor: 'red',
    width: wp('60%'),
    paddingVertical: hp('1%'),
  },
  txt1: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    fontFamily: 'DMSans',
    color: '#FAFAFA',
  },
  txt2: {
    fontSize: hp('2%'),
    fontWeight: '500',
    fontFamily: 'DMSans',
    color: '#FAFAFA',
  },
  txt3: {
    fontSize: hp('2.5%'),
    fontWeight: '500',
    color: 'red',
    marginHorizontal: wp('5%'),
    padding: wp('1%'),
    fontFamily: 'DMSans',
  },
  imageborder: {
    borderWidth: 1.5,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    height: wp('25%'),
    width: wp('25%'),
    borderRadius: hp('100%'),
    overflow: 'hidden',
    borderColor:'#FF6D1A',
  },
  imgtxt: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('5%'),
  },
});
