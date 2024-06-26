import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';

export const data = [
  {
    id: 1,
    name: 'Coca Cola Can (24Can 1Box)',
    barcode: '#2642456',
    price: '3,500',
    qty: '2',
    Total: '12,444',
  },
  {
    id: 2,
    barcode: '#9766593',
    price: '3,000',
    name: 'Sprite',
    qty: '123',
    Total: '12,444',
  },
  {
    id: 3,
    barcode: '#7394293',
    price: '2,000',
    name: 'Chips',
    qty: '3',
    Total: '12,444',
  },
  {
    id: 4,
    barcode: '#7569246',
    price: '7,000',
    name: 'Food',
    qty: '1',
    Total: '12,444',
  },
  {
    id: 5,
    barcode: '#2568721',
    price: '12,000',
    name: 'Butter',
    qty: '1',
    Total: '12,444',
  },
];

const Buying_list = ({items, setProduct}) => {
  const handleDelete = id => {
    const filterProduct = items.filter(item => item.id !== id);
    // console.log('filter', filterProduct);
    setProduct(filterProduct);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{marginTop: hp('5%')}}>
        <FlatList
          data={items ? items : []}
          renderItem={({item}) => {
            // console.log('item', item);
            return (
              <View style={styles.produceview}>
                {/* icon_and_price */}
                <Text style={{...styles.listname, flex: 3}} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={{...styles.listtxt, flex: 1, textAlign: 'center'}}>
                  {item.qty}
                </Text>
                <Text style={{...styles.listname, flex: 2, textAlign: 'right'}}>
                  {item.Total}
                </Text>
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() => handleDelete(item.id)}>
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
  container: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
    borderRadius: hp('2%'),
    backgroundColor: '#FFFFFF',
    padding: wp('2%'),
    marginHorizontal: wp('5%'),
    marginVertical: hp('1%'),
  },
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
