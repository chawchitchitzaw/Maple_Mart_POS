import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CashBtn = ({lable, goto}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(goto)}>
      <View style={styles.icon_lable}>
        <Text style={styles.txt1}>{lable}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CashBtn;
const styles = StyleSheet.create({
  container: {
    borderRadius: hp('3%'),
    paddingVertical: hp('1%'),
    height: hp('6.5%'),
    marginVertical: hp('1%'),
    backgroundColor: '#FF6D1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt1: {
    fontSize: hp('2.5%'),
    fontWeight: '500',
    fontFamily: 'DMSans',
    color: '#fff',
    marginHorizontal: wp('5%'),
  
  },
});
