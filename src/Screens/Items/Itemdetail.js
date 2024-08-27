import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Back from '../../component/Back/Back';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToCart, removeItemFromCart} from '../../store/cartSlice';
import {getProducts} from '../../store/productSlice';

const Itemdetail = ({route}) => {
  const imageUrl = 'https://staging.aggademo.me/pos-backend/public/storage';
  const {product} = route.params;
  const dispatch = useDispatch();
  const productStatus = useSelector(state => state.products.status);
  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(getProducts());
    }
  }, [dispatch, productStatus]);

  const addToCartHandler = () => {
    dispatch(addItemToCart(product));
  };

  return (
    <SafeAreaView>
      <Back lable={'Details'} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View>
          <Image
            style={styles.image}
            source={{uri: `${imageUrl}/${product.image}`}}
          />

          <View style={styles.info}>
            <Text style={styles.name}>{product.product_name}</Text>
            <Text style={styles.pricetxt}>{product.sell_price} MMK</Text>
          </View>

          <View style={styles.info}>
            <View style={styles.flatlistbox}>
              <Text style={styles.nametxt}>Barcode</Text>
              <Text style={styles.valuetxt} selectable={true}>
                {product.barcode}
              </Text>
            </View>
            <View style={styles.flatlistbox}>
              <Text style={styles.nametxt}>Category</Text>
              <Text style={styles.valuetxt}>{product.category_name}</Text>
            </View>
            <View style={styles.flatlistbox}>
              <Text style={styles.nametxt}>Description</Text>
              <Text style={styles.valuetxt}>{product.description}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.addtocard}
        onPress={() => addToCartHandler(product.barcode)}>
        <Text style={styles.addtxt}>Add to Card</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    marginTop: wp('2'),
    marginBottom: wp('2'),
  },
  flatlistbox: {
    flex: 3,
    marginVertical: wp('3'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    alignSelf: 'center',
    height: hp('40'),
    width: wp('90'),
    resizeMode: 'contain',
  },
  info: {
    marginVertical: hp(0.5),
    marginHorizontal: wp(2),
    backgroundColor: '#fff',
    padding: wp(3),
    borderRadius: 5,
  },
  name: {
    fontSize: 20,
    fontFamily: 'DMSans',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pricetxt: {
    fontSize: 18,
    fontFamily: 'DMSans',
    color: '#999',
  },
  valuetxt: {
    fontSize: 16,
    fontFamily: 'DMSans',
    flex: 2,
    //lineHeight: 24,
  },
  nametxt: {
    fontFamily: 'DMSans',
    fontSize: 16,
    flex: 1,
  },
  addtocard: {
    borderRadius: hp('2%'),
    paddingVertical: hp('1%'),
    alignItems: 'center',
    marginHorizontal: wp('2%'),
    marginVertical: hp('3%'),
    backgroundColor: '#FF6D1A',
  },
  addtxt: {
    fontSize: hp('2.5%'),
    fontWeight: '500',
    color: '#FFFFFF',
    padding: wp('0.5%'),
    fontFamily: 'DMSans',
  },
};

export default Itemdetail;
