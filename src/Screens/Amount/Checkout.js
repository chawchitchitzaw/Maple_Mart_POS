import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {chargeOut} from '../../store/cartSlice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CashBtn from '../../component/Product/CashBtn';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Billlist from '../../component/Bill/Billlist';
import Back from '../../component/Back/Back';

const Checkout = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const handleNewSale = () => {
    dispatch(chargeOut());
    navigation.navigate('Scan');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Back />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.paybill}>
        <View style={{alignItems: 'center', marginBottom: hp('5%')}}>
          <Text style={styles.title}>Maple Mart</Text>
        </View>
        <View style={styles.invoice}>
          <Text style={styles.lefttxt}>Invoice No:</Text>
          <Text style={styles.righttxt}>00020008418</Text>
        </View>
        <View style={styles.invoice}>
          <Text style={styles.lefttxt}>Bill Date:</Text>
          <Text style={styles.righttxt}>6/7/2024(3:00PM)</Text>
        </View>
        <View style={styles.invoice}>
          <Text style={styles.lefttxt}>Casher:</Text>
          <Text style={styles.righttxt}>Aye Aye</Text>
        </View>
        <View style={styles.invoice}>
          <Text style={styles.lefttxt}>Customer Name:</Text>
          <Text style={styles.righttxt}></Text>
        </View>
        <Billlist />
      </ScrollView>

      <View style={{marginVertical: hp('5%')}}>
        <CashBtn
          lable="PRINT BILL"
          onPress={() => navigation.navigate('Edit_Profile')}
        />
        <CashBtn lable="NEW SALE" onPress={handleNewSale} />
      </View>
    </View>
  );
};

export default Checkout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: wp('5%'),
  },
  title: {
    color: '#FF6D1A',
    fontWeight: '500',
    fontSize: hp('3.5%'),
    fontFamily: 'DMSans',
  },
  invoice: {
    flexDirection: 'row',
    marginHorizontal: wp('1%'),
    marginVertical: hp('0.5%'),
  },
  lefttxt: {
    fontWeight: '500',
    fontSize: hp('2.2%'),
    fontFamily: 'DMSans',
    flex: 3,
  },
  righttxt: {
    fontWeight: '500',
    fontSize: hp('2.2%'),
    fontFamily: 'DMSans',
    flex: 4,
  },
  paybill: {
    backgroundColor: '#FFFFFF',
    padding: hp('1%'),
    height: hp('60%'),
    elevation: 1,
  },
});
