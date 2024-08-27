import {View, Text, StyleSheet,FlatList} from 'react-native';
import React, { useState, useEffect } from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {chargeOut} from '../../store/cartSlice';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CashBtn from '../../component/Product/CashBtn';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Billlist from '../../component/Bill/Billlist';
import Back from '../../component/Back/Back';
import axios from 'axios';
import RNPrint from 'react-native-print';
import moment from 'moment';

const Checkout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const cash_method = route.params.pay;
  const valuee = route.params.value;
  const discount = route.params.totalDiscount;

  const handleNewSale = () => {
    dispatch(chargeOut());
    navigation.navigate('Scan');
  };

  const [invoice, setInvoice] = useState([]);
  const [invoicee, setInvoicee] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState(null);
  const [total, setTotal] = useState(null);
  const [SubTotal, setSubTotal] = useState(null);
  const [date, setDate] = useState(null);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const user = useSelector(state => state.user);
  const token = user.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const invoiceapi = await axios.get('https://staging.aggademo.me/pos-backend/public/api/invoiceId', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setInvoice(invoiceapi.data[1]);
        setInvoicee(invoiceapi.data[0]);
        const invoices = invoiceapi.data[0];
        if (invoices.length > 0) {
          const lastInvoice = invoices[invoices.length - 1];
          setInvoiceNumber(lastInvoice.invoice_id);
          setTotal(lastInvoice.total_amount);
          setSubTotal(lastInvoice.sub_total);
          setDate(lastInvoice.updated_at);
        } else {
          setInvoiceNumber('No invoices found');
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (invoice.length > 0) {
      const filtered = invoice.filter(invoicee => invoicee.invoice_id === invoiceNumber);
      setFilteredInvoices(filtered);
    }
  }, [invoice, invoiceNumber]);


  const handlePrint = async () => {
    await RNPrint.print({
      html: `
        <html>
            <head>
              <style>
                body { font-family: 'DMSans', sans-serif; }
                .container { padding: 20px; }
                .title { color: #FF6D1A; font-weight: 500; font-size: 24px; text-align: center; }
                .invoice { display: flex; justify-content: space-between; margin: 5px 0; }
                .item { display: flex; justify-content: space-between; margin: 5px 0; border-top: 1px dashed #000; border-bottom: 1px dashed #000; padding: 5px 0; }
                .thank { color: #FF6D1A; font-weight: 500; font-size: 18px; text-align: center; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="title">Maple Mart</div>
                <div class="invoice"><span>Invoice No:</span><span>${invoiceNumber}</span></div>
                <div class="invoice"><span>Bill Date:</span><span>${moment(date).format('DD-MM-YYYY')}</span></div>
                <div class="invoice"><span>Casher:</span><span>${user.name}</span></div>
                <div class="invoice"><span>Customer Name:</span><span> -</span></div>
                <div class="item">
                  <span>Item</span><span>Qty</span><span>Amount(K)</span>
                </div>
                ${filteredInvoices.map(item => `
                  <div class="item">
                    <span>${item.product_name}</span><span>${item.qty}</span><span>${item.total}</span>
                  </div>
                `).join('')}
                <div class="invoice"><span>Total:</span><span>${total}</span></div>
                <div class="invoice"><span>Discount:</span><span>${discount}</span></div>
                <div class="invoice"><span>Tax Amount:</span><span>${(total-discount)*(5/100)}</span></div>
                <div class="invoice"><span>Net Total:</span><span>${SubTotal}</span></div>
                <div class="invoice"><span>Paid Amount:</span><span>${valuee}</span></div>
                <div class="invoice"><span>Change Amount:</span><span>${valuee-SubTotal}</span></div>
                <div class="invoice"><span>${cash_method}:</span><span>${SubTotal}</span></div>
                <div class="thank">Thank you for shopping with us!</div>
              </div>
            </body>
          </html>
      `
    });
  };
  const testRender = ({ item }) => (
    <View style={styles.bill}>
      <Text style={styles.itemtxt}>{item.product_name}</Text>
      <Text style={styles.qty}>{item.qty}</Text>
      <Text style={styles.amount}>{item.total}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
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
          <Text style={styles.righttxt}>{moment(date).format('DD-MM-YYYY')}</Text>
        </View>
        <View style={styles.invoice}>
          <Text style={styles.lefttxt}>Casher:</Text>
          <Text style={styles.righttxt}>{user.name}</Text>
        </View>
        <View style={styles.invoice}>
          <Text style={styles.lefttxt}>Customer Name:</Text>
          <Text style={styles.righttxt}> - </Text>
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
            <Text style={styles.righttxt1}>{total}</Text>
          </View>
          <View style={styles.nettotal}>
            <Text style={styles.lefttxt}>Discount:</Text>
            <Text style={styles.righttxt1}>{discount}</Text>
          </View>
          <View style={styles.nettotal}>
            <Text style={styles.lefttxt}>Tax Amount:</Text>
            <Text style={styles.righttxt1}>{(total-discount)*(5/100)}</Text>
          </View>
          <View style={styles.nettotal}>
            <Text style={styles.lefttxt}>Net Total:</Text>
            <Text style={styles.righttxt1}>{SubTotal}</Text>
          </View>
          <View style={styles.nettotal}>
            <Text style={styles.lefttxt}>Paid Amount:</Text>
            <Text style={styles.righttxt1}>{valuee}</Text>
          </View>
          <View style={styles.nettotal}>
            <Text style={styles.lefttxt}>Change Amount:</Text>
            <Text style={styles.righttxt1}>{valuee-SubTotal}</Text>
          </View>
          <View style={styles.nettotal}>
            <Text style={styles.lefttxt}>{cash_method}:</Text>
            <Text style={styles.righttxt1}>{SubTotal}</Text>
          </View>
          <Text style={styles.thank}> Thank you for shopping with us!</Text>
        </View>
      </ScrollView>

      <View style={{marginVertical: hp('5%')}}>
        <CashBtn lable="PRINT BILL" onPress={handlePrint} />
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
  printButton: {
    backgroundColor: '#FF6D1A',
    color: '#FFFFFF',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
});
