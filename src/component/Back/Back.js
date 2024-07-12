import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Ionicons from 'react-native-vector-icons/Ionicons';
const Back = ({lable}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backbtn} onPress={handleBack}>
        <Ionicons
          name="chevron-back"
          size={25}
          color={'#FF6D1A'}
          style={{marginLeft: wp('5%')}}
        />
      </TouchableOpacity>

      <View style={styles.lab}>
        <Text style={styles.txt1}>{lable}</Text>
      </View>
    </View>
  );
};

export default Back;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    padding: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt1: {
    fontSize: hp('2.5%'),
    fontWeight: '500',
    fontFamily: 'DMSans',
    color: '#000000',
  },
  lab: {
    width: wp('100%'),
    height: hp('5%'),
    zIndex: 1,
    alignItems: 'center',
  },
  backbtn: {
    position: 'absolute',
    left: wp(-53),
    top: -5,
    zIndex: 3,
    backgroundColor: '#FAFAFA',
    borderRadius: wp('5%'),
    padding: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FF6D1A',
  },
});
