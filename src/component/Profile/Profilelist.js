import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Profilelist = ({icon, lable, goto, front}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(goto)}>
      <View style={styles.icon_lable}>
        <View style={{flexDirection: 'row'}}>
          <Icon name={icon} size={25} color="#606F89" />
          <Text style={styles.txt1}>{lable}</Text>
        </View>

        <Icon name={front} size={25} color="#606F89" />
      </View>
    </TouchableOpacity>
  );
};

export default Profilelist;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    elevation: 1,
    borderRadius: hp('2%'),
    padding: wp('2%'),
    marginHorizontal: wp('5%'),
    marginVertical: hp('1%'),
  },
  txt1: {
    fontSize: hp('2.5%'),
    fontWeight: '500',
    fontFamily: 'DMSans',
    color: '#606F89',
    marginHorizontal: wp('5%'),
  },

  icon_lable: {
    marginHorizontal: wp('3%'),
    flexDirection: 'row',
    paddingVertical: hp('0.5%'),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
