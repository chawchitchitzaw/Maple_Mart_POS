import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Back from '../../component/Back/Back';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SelectCountry } from 'react-native-element-dropdown';
import CashBtn from '../../component/Product/CashBtn';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToCart, removeItemFromCart} from '../../store/cartSlice';
import {getProducts} from '../../store/productSlice';

const local_data = [
  {
    value: '1',
    lable: 'Cash',
  },
  {
    value: '2',
    lable: 'Card',
  },
];

const calculateDiscount = totalAmount => {
  if (totalAmount >= 1000000) {
    return Math.ceil(totalAmount / 30);
  } else if (totalAmount >= 500000) {
    return Math.ceil(totalAmount / 20);
  } else if (totalAmount >= 50000) {
    return Math.ceil(totalAmount / 10);
  } else {
    return 0;
  }
};

const Amount = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [pay, setPay] = useState('1');
  const dispatch = useDispatch();
  const baseUrl = 'http://192.168.100.11/pos-backend/public/api';
  const cartItems = useSelector(state => state.cart.items);
  
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const products = useSelector(state => state.products.items);
  const productStatus = useSelector(state => state.products.status);
  const error = useSelector(state => state.products.error);
  const grandTotal = cartItems.reduce((total, item) => {
    return total + item.quantity * item.sell_price;
  }, 0);
  const totalDiscount = calculateDiscount(grandTotal);
  const id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.token);
  const route = useRoute();

  const broughtItem = route.params.broughtItem;

  const newData = broughtItem.map(item => ({
    product_id: item.id,
    unit_price: item.sell_price,
    total: item.quantity * item.sell_price,
    qty: item.quantity,
  }));

  const newString = JSON.stringify(newData);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(getProducts());
    }
  }, [dispatch, productStatus]);

  const handlecheckout = async () => {
    const data = {
      user_id: id,
      customer_id: randomNum,
      payment_id: randomNum,
      total_amount: grandTotal,
      discount: totalDiscount,
      sub_total: grandTotal - totalDiscount,
      payment_status: 'paid',
      order_item: newString,
    };

    try {
      const response = await fetch(`${baseUrl}/createOrder`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      
      const res = await response.json();
      
      if (res.status) {
        console.log('Order placed successfully');
        navigation.navigate('Checkout',{value,totalDiscount,pay});
      } else {
        console.log('Order placement failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  function generateRandomNumber() {
    const min = 1;
    const max = 99999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    // Convert randomNumber to a string and pad with leading zeros if necessary
    const formattedRandomNumber = randomNumber.toString().padStart(8, '0');

    return formattedRandomNumber;
  }

  // Example usage
  const randomNum = generateRandomNumber();
  console.log('111111111111',value)
  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back />
        </TouchableOpacity>
        <View style={styles.amountlist}>
          <Text style={styles.besidebox}>Total</Text>
          <Text style={styles.inputtxt}>{grandTotal}</Text>
        </View>
        <View style={styles.amountlist}>
          <Text style={styles.besidebox}>Discount</Text>
          <Text style={styles.inputtxt}>{totalDiscount}</Text>
        </View>
        <View style={styles.amountlist}>
          <Text style={styles.besidebox}>Net Total</Text>
          <Text style={styles.inputtxt}>{grandTotal - totalDiscount}</Text>
        </View>
        <View style={styles.amountlist}>
          <Text style={styles.besidebox}>Cash Received</Text>
          <TextInput
            placeholder="Enter Amount"
            placeholderTextColor="#9C9C9C"
            style={styles.inputtxt}
            keyboardType="numeric"
            value={value}
            onChangeText={setValue}
          />
        </View>
        <View style={{ ...styles.amountlist, marginBottom: hp('10%') }}>
          <Text style={styles.besidebox}>Payment Method</Text>
          <SelectCountry
            style={styles.dropdown}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            value={pay}
            data={local_data}
            valueField="value"
            labelField="lable"
            placeholder="Payment"
            onChange={(e) => {
              setPay(e.value);
            }}
          />
        </View>
        <CashBtn lable="PAY BILL" onPress={handlecheckout} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Amount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: wp('5%'),
  },
  amountlist: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('1%'),
    marginVertical: hp('1%'),
  },
  inputtxt: {
    fontWeight: '500',
    fontSize: hp('2.2%'),
    fontFamily: 'DMSans',
    backgroundColor: '#FFFFFF',
    borderRadius: hp('1%'),
    elevation: 1,
    flex: 1,
    paddingHorizontal: wp('5%'),
    height: hp('6.5%'),
    flex: 2,
    textAlign: 'right',
    textAlignVertical: 'center',
  },
  besidebox: {
    color: '#606F89',
    fontWeight: '500',
    fontSize: hp('2.2%'),
    fontFamily: 'DMSans',
    marginVertical: hp('1%'),
    marginRight: wp('2%'),
    flex: 2,
  },
  dropdown: {
    elevation: 1,
    height: wp('15%'),
    backgroundColor: '#FFFFFF',
    borderRadius: hp('2%'),
    paddingHorizontal: wp('3%'),
    flex: 2,
  },
  placeholderStyle: {
    fontSize: hp('2.2%'),
  },
  selectedTextStyle: {
    fontWeight: '500',
    fontSize: hp('2.2%'),
    fontFamily: 'DMSans',
    color: '#9C9C9C',
    marginLeft: wp('3%'),
  },
});
