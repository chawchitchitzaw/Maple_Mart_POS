import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import lady from '../../Assets/lady.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Back from '../../component/Back/Back';
import {useSelector} from 'react-redux';

const View_Profile = () => {
  const user = useSelector(state => state.user);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
      <View>
        <Back lable={'Profile'} />
      </View>

      <View style={styles.imageside}>
        <View style={styles.imageborder}>
          {!user.profile_url ? (
            <Image
              source={lady}
              style={{height: '100%', width: '100%', borderRadius: 100}}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={{uri: `data:image/png;base64,${user.profile_url}`}}
              style={{height: '100%', width: '100%', borderRadius: 100}}
              resizeMode="contain"
            />
          )}
        </View>
      </View>
      <View>
        <View style={{marginBottom: hp('1%')}}>
          <Text style={styles.txt1}>User Name</Text>
          <Text style={styles.txt2}>{user.name}</Text>
        </View>
        <View style={{marginBottom: hp('1%')}}>
          <Text style={styles.txt1}>Email</Text>
          <Text style={styles.txt2}>{user.email}</Text>
        </View>
        <View style={{marginBottom: hp('1%')}}>
          <Text style={styles.txt1}>Position</Text>
          <Text style={styles.txt2}>{user.position}</Text>
        </View>
        <View style={{marginBottom: hp('1%')}}>
          <Text style={styles.txt1}>Gender</Text>
          <Text style={styles.txt2}>{user.gender}</Text>
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
    // padding: wp('3%'), 
  },
  imageside: {
    alignItems: 'center',
    paddingVertical: hp('1%'),
  },
});
