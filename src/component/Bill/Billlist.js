import {View, Text, StyleSheet, FlatList} from 'react-native';
import React,{useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { useRoute} from '@react-navigation/native';

const Billlist = ({method,sub_total,discount}) => {
  const cartItems = useSelector(state => state.cart.items);
  const grandTotal = cartItems.reduce((total, item) => {
    return total + item.quantity * item.sell_price;
  }, 0);
 
  const testRender = ({item}) => {
    return (
      <View style={styles.bill}>
        <Text style={styles.itemtxt}>{item.product_name}</Text>
        <Text style={styles.qty}>{item.quantity}</Text>
        <Text style={styles.amount}>{item.sell_price * item.quantity}</Text>
      </View>
    );
  };
  const route = useRoute();
  const {value,totalDiscount,pay} = route.params;
  const tax = (grandTotal-totalDiscount)*(8/100);
  const total = sub_total+tax;
    
  return (
    <View>
      <View style={styles.item}>
        <Text style={styles.itemtxt}>Item</Text>
        <Text style={styles.qty}>Qty</Text>
        <Text style={styles.amount}>Amount(K)</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={testRender}
      />
      <View style={styles.total}>
        <Text style={styles.lefttxt}>Total:</Text>
        <Text style={styles.righttxt}>{grandTotal}</Text>
      </View>
      <View style={styles.nettotal}>
        <Text style={styles.lefttxt}>Discount:</Text>
        <Text style={styles.righttxt}>{discount}</Text>
      </View>
      <View style={styles.nettotal}>
        <Text style={styles.lefttxt}>Tax Amount:</Text>
        <Text style={styles.righttxt}>{tax}</Text>
      </View>
      <View style={styles.nettotal}>
        <Text style={styles.lefttxt}>Net Total:</Text>
        <Text style={styles.righttxt}>{sub_total}</Text>
      </View>
      <View style={styles.nettotal}>
        <Text style={styles.lefttxt}>Paid Amount:</Text>
        <Text style={styles.righttxt}>{value}</Text>
      </View>
      <View style={styles.nettotal}>
        <Text style={styles.lefttxt}>Change Amount:</Text>
        <Text style={styles.righttxt}>{value-sub_total}</Text>
      </View>
      <View style={styles.nettotal}>
        <Text style={styles.lefttxt}>{method}:</Text>
        <Text style={styles.righttxt}>{sub_total}</Text>
      </View>
      <Text style={styles.thank}> Thank you for shopping with us!</Text>
    </View>
  );
};

export default Billlist;
const styles = StyleSheet.create({
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
