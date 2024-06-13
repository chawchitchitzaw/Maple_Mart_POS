import React, { useState } from 'react';
import { View, ScrollView, Image, Text, Button,SafeAreaView,FlatList } from 'react-native';
import chips from '../Assets/chips.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Back from '../component/Back/Back';

export const data = [
  {id:1, barcode:'Barcode', name:'1234567891231', price:'1500'},
  {id:2, barcode:'Category', name:'Drink', price:'1500'},
  {id:3, barcode:'Description', name:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,', price:'2500'},
  
];

const Itemdetail = () => {
  const {product,setProduct}= useState(data);
  
  return (
    <SafeAreaView>
      <Back lable={'Details'}/>
      <View>
    <ScrollView style = {styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <View style={styles.imagebox}>
      <Image style={styles.image} source={chips} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>Product Name</Text>
        <Text style={styles.pricetxt}>aaa</Text>
      </View>
      <View style={styles.info2}>
      {data.map((item, index) => (
        <View key={index} style={styles.flatlistbox}>
            <Text style={styles.barcodetxt}>{item.barcode}</Text>
           <Text style={styles.nametxt}>{item.name}</Text>
        </View>
    ))}
      </View>
      
      </View>
    </ScrollView>
    </View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    marginTop:wp('2'),
    marginBottom:wp('2'),
  },
  flatlistbox: {
    flex:3,
    marginVertical:wp('3'),
    flexDirection:'row',
    justifyContent: 'space-between',
    //height:hp('6'),
    
  },
  imagebox: {
    flex:1,
    backgroundColor: '#fff',
    width:wp('100'),
    //height:hp('30'),
    alignSelf:'center'
    
  },
  image: {
    margin:wp('1'),
    flex:1,
    alignSelf:'center'
    
  },
  info: {
    marginTop: 5,
    marginHorizontal:10,
    backgroundColor:'#fff',
    padding:10,
    borderRadius:5,
  },
  info2: {
    flex:1,
    paddingVertical: 5,
    marginTop:5,
    marginBottom:10,
    backgroundColor:'#fff',
    paddingHorizontal:15,
    borderRadius:5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    
    
  },
  pricetxt: {
    fontSize: 18,
    color: '#999',
    
  },
  barcodetxt: {
    flex:1,
  },
  nametxt: {
    flex:2,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
};

export default Itemdetail;