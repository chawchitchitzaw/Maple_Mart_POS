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

const Scan = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState(null);
  const [product, setProduct] = useState(data);
  console.log('product', product);

  const handleSearch = () => {
    if (search == '#') {
      setProduct(data);
    } else {
      const filterProduct = product.filter(item => item.barcode === search);
      console.log('searValue', search);
      console.log('filter', filterProduct);
      setProduct(prevItems => [...prevItems, filterProduct[0]]);
    }
  };

  return (
    <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Amount')}
          style={styles.cbtn}>
          <Text style={styles.btxt}>CHARGE</Text>
          <Text style={styles.bprice}>$ 0</Text>
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

          <View style={styles.scanside}>
            <Image source={scan} style={styles.scanimg} />
          </View>
        </View>
        <Buying_list items={product} setProduct={val => setProduct(val)} />
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
