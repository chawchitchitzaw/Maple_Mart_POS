import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
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

const Profile = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
      <TouchableOpacity onPress={() => navigation.navigate('View_Profile')}>
        <ImageBackground
          source={require('../../Assets/backgound.jpg')}
          resizeMode="cover">
          <Text style={styles.title}>Profile</Text>
          {/* <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'green',
              padding: 10,
              zIndex: 2,
            }}>
            <Text style={styles.title}>Profile</Text>
          </View> */}

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
          <TouchableOpacity
            style={styles.tail}
            onPress={() => navigation.navigate('Login')}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '60%',
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
    fontSize: hp('3%'),
    fontFamily: 'DMSans',
    fontWeight: '500',
    color: '#FAFAFA',
    textAlign: 'center',
    marginTop: hp('2%'),
  },
  tail: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('2%'),
    borderWidth: 2,
    borderColor: '#FED8B1',
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
    color: '#606F89',
    marginHorizontal: wp('5%'),
    padding: wp('1%'),
    fontFamily: 'DMSans',
  },
  imageborder: {
    borderWidth: 1,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    height: wp('25%'),
    width: wp('25%'),
    borderRadius: hp('100%'),
    overflow: 'hidden',
  },
  imgtxt: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('5%'),
  },
});
