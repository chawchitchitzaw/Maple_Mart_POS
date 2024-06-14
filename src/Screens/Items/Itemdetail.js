import React, { useState } from 'react';
import { View, ScrollView, Image, Text, Button,SafeAreaView,FlatList } from 'react-native';
import chips from '../../Assets/chips.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Back from '../../component/Back/Back';

export const data = {
  id:1, barcode:'123456789123', name:'Drink', price:'1500',productname:'Coca Cola',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

const Itemdetail = () => {
  //const {product,setProduct}= useState(data);
  
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
        <Text style={styles.name}>{data.productname}</Text>
        <Text style={styles.pricetxt}>{data.price}</Text>
      </View>
      <View style={styles.info2}>
      <View>
        <View style={styles.flatlistbox}>
            <Text style={styles.nametxt}>Barcode</Text>
            <Text style={styles.valuetxt} selectable={true}>{data.barcode}</Text>
        </View> 
        <View style={styles.flatlistbox}>
            <Text style={styles.nametxt}>Category</Text>
            <Text style={styles.valuetxt}>{data.name}</Text>
        </View> 
        <View style={styles.flatlistbox}>
            <Text style={styles.nametxt}>Description</Text>
            <Text style={styles.valuetxt}>{data.description}</Text>
        </View> 
    </View>
      {/* {data.map((item, index) => (
        <View key={index} style={styles.flatlistbox}>
            <Text style={styles.barcodetxt}>{item.barcode}</Text>
           <Text style={styles.nametxt} selectable={true}>{item.name}</Text>
        </View>
    ))} */}
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
    flex:2,
    lineHeight: 24,
  },
  nametxt: {
    fontFamily: 'DMSans',
    fontSize: 16,
    flex:1,
  },
  
};

export default Itemdetail;