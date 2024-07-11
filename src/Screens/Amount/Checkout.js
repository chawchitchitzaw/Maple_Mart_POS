import {View, Text, StyleSheet} from 'react-native';
import React, { useState,useEffect } from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {chargeOut} from '../../store/cartSlice';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CashBtn from '../../component/Product/CashBtn';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Billlist from '../../component/Bill/Billlist';
import Back from '../../component/Back/Back';
import axios from 'axios';
const Checkout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const cash_method = route.params.pay;
  const discount = route.params.totalDiscount;
  console.log('cash', route.params.pay);
  const handleNewSale = () => {
    dispatch(chargeOut());
    navigation.navigate('Scan');
  };
  const [invoice,setInvoice] = useState([]);
  const [invoiceNumber,setInvoiceNumber]= useState(null);
  const [total,setTotal]= useState(null);
  const [date,setDate]= useState(null);
  const user = useSelector(state => state.user);
  const token = user.token;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const invoiceapi = await axios.get('http://192.168.100.11/pos-backend/public/api/invoiceId',{
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        setInvoice(invoiceapi.data[0]);
        const invoices= invoiceapi.data[0];
        if(invoices.length > 0){
          const lastInvoice = invoices[invoices.length - 1];
          setInvoiceNumber(lastInvoice.invoice_id);
          setTotal(lastInvoice.sub_total);
          setDate(lastInvoice.updated_at);
        } else{
          setInvoiceNumber('No invoices found');
        }
        console.log('hahahhahahah',invoiceapi.data[0]);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        
      }
    };

    fetchData();
  }, []);
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
          <Text style={styles.righttxt}>{invoiceNumber}</Text>
        </View>
        <View style={styles.invoice}>
          <Text style={styles.lefttxt}>Bill Date:</Text>
          <Text style={styles.righttxt}>{date}</Text>
        </View>
        <View style={styles.invoice}>
          <Text style={styles.lefttxt}>Casher:</Text>
          <Text style={styles.righttxt}>{user.name}</Text>
        </View>
        <View style={styles.invoice}>
          <Text style={styles.lefttxt}>Customer Name:</Text>
          <Text style={styles.righttxt}>    -</Text>
        </View>
        <Billlist method={cash_method} sub_total={total} discount={discount}/>
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
