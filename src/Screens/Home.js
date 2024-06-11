import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import chips from '../Assets/chips.png';
import cola from '../Assets/cola.png';
import sprite from '../Assets/sprite.png';
import butter from '../Assets/butter.png';
import food from '../Assets/food.png';
import Searchbox from '../component/search/Searchbox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const data = [
  {id: 1, name: 'chips', img: chips, price: '$20'},
  {id: 2, name: 'cola', img: cola, price: '$25'},
  {id: 3, name: 'sprite', img: sprite, price: '$25'},
  {id: 4, name: 'butter', img: butter, price: '$20'},
  {id: 5, name: 'food', img: food, price: '$20'},
];

const Home = () => {
  const produceData = ({item}) => {
    return (
      <View style={styles.produceview}>
        <Image
          style={styles.produceimg}
          source={item.img}
          resizeMode="contain"
        />
        <View style={{alignSelf: 'flex-start', marginTop: hp('1%')}}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.sentences}>
            <Text style={{color: '#FF6D1A'}}>POS</Text> System
          </Text>
          <Searchbox />
        </View>

        <Text style={styles.textidea}>Best Seller</Text>

        <View style={{marginLeft: wp(3.5)}}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={produceData}
          />
        </View>

        <Text style={styles.textidea}>Revenue</Text>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{marginLeft: wp(3.5)}}>
          <View style={styles.revenue}>
            <Text style={styles.total}>Total Sale</Text>
          </View>
          <View style={styles.revenue}>
            <Text style={styles.total}>Total Quantity</Text>
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sentences: {
    fontSize: hp('3%'),
    fontFamily: 'DMSans',
    marginHorizontal: wp('5%'),
    paddingVertical: hp('2.5%'),
    color: '#000000',
    fontWeight: '500',
  },
  textidea: {
    fontWeight: '500',
    fontFamily: 'DMSans',
    fontSize: hp('2.2%'),
    color: '#4F4F4F',
    marginHorizontal: wp('5%'),
    marginVertical: hp('2%'),
  },
  name: {
    fontSize: hp('1.8%'),
    marginHorizontal: wp('2%'),
    color: '#4F4F4F',
    fontWeight: '500',
  },
  price: {
    fontSize: hp('1.2%'),
    marginHorizontal: wp('2%'),
    color: '#4F4F4F',
    fontWeight: '500',
  },
  produceview: {
    marginHorizontal: wp('2%'),
    marginVertical: hp('1%'),
    backgroundColor: '#FFFFFF',
    elevation: 1,
    height: hp('25%'),
    borderRadius: hp('2%'),
    width: wp('40%'),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: wp('3%'),
    // borderWidth: 2,
    // borderColor: 'red',
    // shadowColor: 'black',
    // shadowOpacity: 0.26,
    // shadowOffset: {width: 0, height: 2},
    // shadowRadius: 10,
    // elevation: 3,
    // backgroundColor: 'white',
  },
  produceimg: {
    width: wp(90),
    height: hp(15),
    resizeMode: 'contain',
  },
  total: {
    fontSize: hp('2%'),
    fontFamily: 'DMSans',
    padding: wp('2%'),
    fontWeight: '500',
    marginHorizontal: wp('3%'),
  },
  revenue: {
    marginHorizontal: wp('2%'),
    backgroundColor: '#FFFFFF',
    elevation: 1,
    height: hp('12%'),
    borderRadius: hp('2%'),
    width: wp('40%'),
    marginVertical: hp('1%'),
  },
});
