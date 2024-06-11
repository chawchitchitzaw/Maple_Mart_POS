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
        <Ionicons name="chevron-back" size={25} color={'#000000'} />
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
    // backgroundColor: 'green',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt1: {
    fontSize: hp('3%'),
    fontWeight: '500',
    fontFamily: 'DMSans',
    color: '#000000',
    // paddingHorizontal:50
  },
  lab: {
    width: wp('100%'),
    height: hp('5%'),
    zIndex: 1,
    alignItems: 'center',
  },
  backbtn: {
    position: 'absolute',
    left: -190,
    top: -5,
    zIndex: 3,
    backgroundColor: '#FAFAFA',
    borderRadius: hp('5%'),
    padding: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
});