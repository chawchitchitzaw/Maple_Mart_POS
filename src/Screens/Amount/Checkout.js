import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Back from '../../component/Back/Back';
import CashBtn from '../../component/Product/CashBtn';

const Checkout = () => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View style={styles.total}>
            <Text style={styles.totaltxt1}>$ 250</Text>
            <Text style={styles.totaltxt2}>Total Paid</Text>
          </View>
          <View style={styles.total}>
            <Text style={styles.totaltxt1}>$ 2000</Text>
            <Text style={styles.totaltxt2}>Change</Text>
          </View>
        </View>
        <View style={{marginTop: hp('17%')}}>
          <CashBtn lable="PRINT BILL" goto="Edit_Profile" />
          <CashBtn lable="NEW SALE" goto="Scan" />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Checkout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: wp('5%'),
  },
  total: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: hp('3%'),
    marginBottom: hp('5%'),
    flex: 1,
  },
  totaltxt1: {
    fontWeight: 'bold',
    fontSize: hp('3.5%'),
    fontFamily: 'DMSans',
    color: '#000000',
  },

  totaltxt2: {
    fontWeight: '500',
    fontSize: hp('2.5%'),
    fontFamily: 'DMSans',
    color: '#000000',
  },
});
