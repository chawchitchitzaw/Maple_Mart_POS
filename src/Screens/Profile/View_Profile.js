import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import lady from '../../Assets/lady.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Back from '../../component/Back/Back';

export const userData = {
  id: 1,
  name: 'Chaw Chit Chit Zaw',
  position: 'Manager',
  email: 'test@gmail.com',
  gender: 'Female',
};

const View_Profile = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
      <View>
        <Back lable={'Profile'} />
      </View>

      <View style={styles.imageside}>
        <View style={styles.imageborder}>
          <Image
            source={lady}
            style={{height: '100%', width: '100%'}}
            resizeMode="contain"
          />
        </View>
      </View>
      <View>
        <View style={{marginBottom: hp('1%')}}>
          <Text style={styles.txt1}>User Name</Text>
          <Text style={styles.txt2}>{userData.name}</Text>
        </View>
        <View style={{marginBottom: hp('1%')}}>
          <Text style={styles.txt1}>Email</Text>
          <Text style={styles.txt2}>{userData.email}</Text>
        </View>
        <View style={{marginBottom: hp('1%')}}>
          <Text style={styles.txt1}>Position</Text>
          <Text style={styles.txt2}>{userData.position}</Text>
        </View>
        <View style={{marginBottom: hp('1%')}}>
          <Text style={styles.txt1}>Gender</Text>
          <Text style={styles.txt2}>{userData.gender}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default View_Profile;
const styles = StyleSheet.create({
  txt1: {
    fontSize: hp('2.5%'),
    fontWeight: '500',
    fontFamily: 'DMSans',
    marginHorizontal: wp('5%'),
    padding: hp('1%'),
  },
  txt2: {
    fontSize: hp('2%'),
    fontWeight: '500',
    fontFamily: 'DMSans',
    padding: hp('1%'),
    marginHorizontal: wp('5%'),
    color: '#000000',
    borderBottomWidth: 1,
    borderColor: '#00000080',
  },
  imageborder: {
    height: wp('30%'),
    width: wp('30%'),
    borderWidth: 1.5,
    borderColor: '#FF6D1A',
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('100%'),
    overflow: 'hidden',
    padding: wp('3%'),
  },
  imageside: {
    alignItems: 'center',
    paddingVertical: hp('1%'),
  },
});
