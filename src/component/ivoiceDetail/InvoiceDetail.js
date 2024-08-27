import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import Back from '../Back/Back';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';

const InvoiceDetail = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const products = route.params.productt;
  const invoiceid = products.invoice_id;
  const date = products.updated_at;
  const total = products.sub_total;
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [invoice, setInvoice] = useState([]);

  const user = useSelector(state => state.user);
  const token = user.token;
  const username = user.name;

  const cash_method = route.params.pay;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const invoiceapi = await axios.get(
          'https://staging.aggademo.me/pos-backend/public/api/invoiceId',
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setInvoice(invoiceapi.data[1]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    if (invoice.length > 0) {
      const filtered = invoice.filter(
        invoicee => invoicee.invoice_id === invoiceid,
      );
      setFilteredInvoices(filtered);
    }
  }, [invoice, invoiceid]);

  const testRender = ({item}) => (
    <View style={styles.bill}>
      <Text style={styles.itemtxt}>{item.product_name}</Text>
      <Text style={styles.qty}>{item.qty}</Text>
      <Text style={styles.amount}>{item.total}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Receipts')}>
        <Back />
      </TouchableOpacity>
      <ScrollView style={styles.paybill}>
        <View style={{alignItems: 'center', marginBottom: hp('5%')}}>
          <Text style={styles.title}>Maple Mart</Text>
        </View>
        <View style={styles.invoice}>
          <Text style={styles.lefttxt}>Invoice No:</Text>
          <Text style={styles.righttxt}>{invoiceid}</Text>
        </View>
        <View style={styles.invoice}>
          <Text style={styles.lefttxt}>Bill Date:</Text>
          <Text style={styles.righttxt} numberOfLines={1}>
            {moment(date).format('DD-MM-YYYY')}
          </Text>
        </View>
        <View style={styles.invoice}>
          <Text style={styles.lefttxt}>Casher:</Text>
          <Text style={styles.righttxt}>{username}</Text>
        </View>
        <View style={styles.invoice}>
          <Text style={styles.lefttxt}>Customer Name:</Text>
          <Text style={styles.righttxt}> -</Text>
        </View>
        <View>
          <View style={styles.item}>
            <Text style={styles.itemtxt}>Item</Text>
            <Text style={styles.qty}>Qty</Text>
            <Text style={styles.amount}>Amount(K)</Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredInvoices}
            keyExtractor={item => item.id.toString()}
            renderItem={testRender}
          />
          <View style={styles.total}>
            <Text style={styles.lefttxt}>Total:</Text>
            <Text style={styles.righttxt1}>{products.total_amount}</Text>
          </View>
          <View style={styles.nettotal}>
            <Text style={styles.lefttxt}>Discount:</Text>
            <Text style={styles.righttxt1}>{products.discount}</Text>
          </View>
          <View style={styles.nettotal}>
            <Text style={styles.lefttxt}>Tax Amount:</Text>
            <Text style={styles.righttxt1}>
              {(products.total_amount - products.discount) * (5 / 100)}
            </Text>
          </View>
          <View style={styles.nettotal}>
            <Text style={styles.lefttxt}>Net Total:</Text>
            <Text style={styles.righttxt1}>{total}</Text>
          </View>
          <View style={styles.nettotal}>
            <Text style={styles.lefttxt}>Paid Amount:</Text>
            <Text style={styles.righttxt1}></Text>
          </View>
          <View style={styles.nettotal}>
            <Text style={styles.lefttxt}>Change Amount:</Text>
            <Text style={styles.righttxt1}></Text>
          </View>
          <Text style={styles.thank}> Thank you for shopping with us!</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default InvoiceDetail;

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
    height: hp('80%'),
    elevation: 1,
  },
  bill: {
    flexDirection: 'row',
    marginHorizontal: wp('1%'),
    marginVertical: hp('0.5%'),
    paddingVertical: hp('0.5%'),
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    marginHorizontal: wp('1%'),
    marginVertical: hp('0.5%'),
    paddingVertical: hp('0.5%'),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  itemtxt: {
    fontWeight: '500',
    fontSize: hp('2%'),
    fontFamily: 'DMSans',
    flex: 3,
  },
  qty: {
    fontWeight: '500',
    fontSize: hp('2%'),
    fontFamily: 'DMSans',
    flex: 1,
    textAlign: 'right',
  },
  amount: {
    fontWeight: '500',
    fontSize: hp('2.2%'),
    fontFamily: 'DMSans',
    flex: 2,
    textAlign: 'right',
  },
  total: {
    flexDirection: 'row',
    marginHorizontal: wp('1%'),
    marginVertical: hp('0.5%'),
    borderTopWidth: 1,
    borderStyle: 'dashed',
    paddingTop: hp('0.5%'),
  },
  nettotal: {
    flexDirection: 'row',
    marginHorizontal: wp('1%'),
    marginVertical: hp('0.5%'),
  },
  righttxt1: {
    fontWeight: '500',
    fontSize: hp('2.2%'),
    fontFamily: 'DMSans',
    flex: 4,
    textAlign: 'right',
  },
  thank: {
    color: '#FF6D1A',
    fontWeight: '500',
    fontSize: hp('2.2%'),
    fontFamily: 'DMSans',
    marginVertical: hp('3%'),
    textAlign: 'center',
  },
});
