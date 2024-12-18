import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../../store/cartSlice';
import { getProducts } from '../../store/productSlice';


const Buying_list = ({items, setProduct}) => {

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  console.log("cartImte", cartItems)
  const productStatus = useSelector((state) => state.products.status);
  
useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(getProducts());
    }
  }, [dispatch, productStatus]);

  const removeFromCartHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };
  const grandTotal = cartItems.reduce((total, item) => {
    return total + (item.quantity * item.sell_price);
  }, 0);

  console.log("grandtotal ", grandTotal)

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{marginTop: hp('5%')}}>
        <FlatList
          data={cartItems}
          renderItem={({item}) => {
            
            return (
              <View style={styles.produceview}>
                <Text style={{...styles.listname, flex: 3}} numberOfLines={1}>
                  {item.product_name}
                </Text>
                <Text style={{...styles.listtxt, flex: 1, textAlign: 'center'}}>
                  {item.quantity}
                </Text>
                <Text style={{...styles.listname, flex: 2, textAlign: 'right'}}>
                  {item.quantity * item.sell_price}
                </Text>
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() => removeFromCartHandler(item.barcode)}>
                  <Icon name="delete" size={22} color={'#606F89'} />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Buying_list;
const styles = StyleSheet.create({
  produceview: {
    marginVertical: hp('0.5%'),
    height: hp('7.5%'),
    backgroundColor: '#FFFFFF',
    elevation: 1,
    borderRadius: hp('2%'),
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  listname: {
    fontSize: hp('2%'),
    color: '#606F89',
    fontWeight: '500',
    fontFamily: 'DMSans',
  },
  listtxt: {
    fontSize: hp('2%'),
    color: '#606F89',
    fontWeight: '500',
    fontFamily: 'DMSans',
  },
});
