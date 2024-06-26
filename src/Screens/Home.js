import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
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
import {Dimensions} from 'react-native';
const width = Dimensions.get('window').width - 20;

export const data = [
  {id: 1, name: 'chips', img: chips, price: '$20'},
  {id: 2, name: 'cola', img: cola, price: '$25'},
  {id: 3, name: 'sprite', img: sprite, price: '$25'},
  {id: 4, name: 'butter', img: butter, price: '$20'},
  {id: 5, name: 'food', img: food, price: '$20'},
  {id: 6, name: 'chips', img: chips, price: '$20'},
  {id: 7, name: 'cola', img: cola, price: '$25'},
  {id: 8, name: 'sprite', img: sprite, price: '$25'},
  {id: 9, name: 'butter', img: butter, price: '$20'},
  {id: 10, name: 'food', img: food, price: '$20'},
];

const Home = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Itemdetail')}>
      <Image source={item.img} style={{width:wp('30'),height:hp('25'),alignSelf:'center',resizeMode:'contain',}}/>
      <Text style={styles.txtname} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.txtprice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.sentences}>
            <Text style={{color: '#FF6D1A'}}>POS</Text> System
          </Text>
          <Searchbox />
        </View>

        

        <Text style={styles.textidea}>Revenue</Text>

        <View style={styles.revenuebox}>
          <View style={styles.revenue}>
            <Text style={styles.total}>Total Sale</Text>
          </View>
          <View style={styles.revenue}>
            <Text style={styles.total}>Total Quantity</Text>
          </View>
        </View>
        <Text style={styles.textidea}>Best Seller</Text>

        <View style={{marginHorizontal:wp('2')}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 3,
    marginBottom:hp('2'),
  },
  row: {
    //flex: 1,
    //justifyContent: 'space-between',
    //marginRight:10,
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
    marginLeft: wp('5%'),
    marginVertical: hp('2%'),
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
    width: wp('46%'),
    marginVertical: 1,
    flex: 1,
    
  },
  revenuebox: {
    flexDirection: 'row',
    flex: 2,
    marginHorizontal:wp('2'),
  },
  item: {
    width: width / 2-10,
    //height:hp('30'),
    borderRadius:hp('2'),
    backgroundColor: '#fff',
    padding: 5,
    //elevation: 1,
    marginVertical: 3,
    marginHorizontal: 5,
    
    
  },
  txtname:{
    fontSize:16,
    fontWeight:'650',
    marginLeft:5,
  },
   txtprice:{
    fontSize:12,
    marginLeft:5,
  },
});
