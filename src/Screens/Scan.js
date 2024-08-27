import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Buying_list from '../component/Product/Buying_list';
import {useState} from 'react';
import {data} from '../component/Product/Buying_list';
import scan from '../Assets/scan.png';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToCart, removeItemFromCart} from '../store/cartSlice';
import {getProducts} from '../store/productSlice';
import {fetchProducts} from '../api/productsApi';
import axios from 'axios';

const Scan = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState(null);
  const [product, setProduct] = useState();
  const baseUrl = 'https://staging.aggademo.me/pos-backend/public/api';
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  // const products = useSelector(state => state.products);
  const user = useSelector(state => state.user);
  const token = user.token;
  const productStatus = useSelector(state => state.products.status);
  const error = useSelector(state => state.products.error);
  const grandTotal = cartItems.reduce((total, item) => {
    return total + item.quantity * item.sell_price;
  }, 0);
  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(getProducts());
    }
  }, [dispatch, productStatus]);

  useEffect(() => {
    const fetchData = async () => {
      const productResponse = await axios.get(
        `${baseUrl}/product/getProductData`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setProduct(productResponse.data[0]);
    };

    fetchData();
  }, []);

  const handleSearch = () => {


    const filterProduct = product.filter(item => item.barcode === search);


    if (filterProduct.length > 0) {
      // If matching products are found, update the state with filtered products
      dispatch(addItemToCart(filterProduct[0]));
    } else {

    }
  };
  const chargehandle = () =>{
    if(!grandTotal == 0){
      navigation.navigate('Amount',{
        broughtItem:cartItems,
      });
    }
  };


  return (
    <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <TouchableOpacity
          onPress={chargehandle}
          style={styles.cbtn}>
          <Text style={styles.btxt}>CHARGE</Text>
          <Text style={styles.bprice}>{grandTotal} MMK</Text>
        </TouchableOpacity>
        <View style={styles.barcodeside}>
          <TextInput
            placeholder="Barcode"
            placeholderTextColor="#9C9C9C"
            style={styles.inputtxt}
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity
            style={styles.scanside}
            onPress={() => navigation.navigate('barcode')}>
            <Image source={scan} style={styles.scanimg} />
          </TouchableOpacity>
        </View>
        <Buying_list items={cartItems} setProduct={val => setProduct(val)} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Scan;
const styles = StyleSheet.create({
  cbtn: {
    backgroundColor: '#FF6D1A',
    padding: wp('3%'),
    alignItems: 'center',
    marginVertical: hp('5%'),
    borderRadius: hp('3%'),
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: wp('5%'),
  },
  btxt: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: hp('2.5%'),
    fontFamily: 'DMSans',
  },
  bprice: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: hp('2%'),
    fontFamily: 'DMSans',
  },
  barcodeside: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  },
  scanside: {
    backgroundColor: '#FFFFFF',
    elevation: 1,
    padding: wp('2.5%'),
    marginLeft: wp('3%'),
    borderRadius: hp('1%'),
  },
  scanimg: {
    height: wp('7%'),
    width: wp('7%'),
  },
});
