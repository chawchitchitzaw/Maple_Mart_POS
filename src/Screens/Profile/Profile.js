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
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Profilelist from '../../component/Profile/Profilelist';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../Redux/Slice/UserSlice';

const Profile = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user);
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
                source={{uri: user.profile_url}}
                style={{height: '100%', width: '100%', borderRadius: 100}}
                resizeMode="cover"
              />
            </View>
            <View style={{flex: 1, marginHorizontal: wp('5%')}}>
              <Text style={styles.txt1}>{user.name}</Text>
              <Text style={styles.txt2}>{user.position}</Text>
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
          <Profilelist
            icon="edit"
            lable="Edit Profile"
            goto="Edit_Profile"
            front="right"
          />
          <Profilelist
            icon="lock"
            lable="Change Password"
            goto="Change_Password"
            front="right"
          />
        </View>

        <TouchableOpacity style={styles.tail} onPress={twoOptionAlert}>
          <Text style={styles.txt3}>Log out</Text>
        </TouchableOpacity>
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
    borderRadius: hp('2%'),
    backgroundColor: '#FF6D1A',
    paddingVertical: hp('1%'),
    alignItems: 'center',
    marginHorizontal: wp('5%'),
    marginVertical: hp('7%'),
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
    color: '#FFFFFF',
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
    borderColor: '#FF6D1A',
  },
  imgtxt: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('5%'),
  },
});
