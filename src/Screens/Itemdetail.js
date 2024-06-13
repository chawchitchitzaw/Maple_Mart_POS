import React from 'react';
import { View, ScrollView, Image, Text, Button,SafeAreaView,FlatList } from 'react-native';
import chips from '../Assets/chips.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Back from '../component/Back/Back';



const Itemdetail = () => {

  const details = ({ item }) => {
    <View>
      
    </View>
  };
  return (
    <SafeAreaView>
      <Back lable={'Details'}/>
    <ScrollView style = {styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <View style={styles.imagebox}>
      <Image style={styles.image} source={chips} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>Product Name</Text>
        <Text style={styles.price}>$99.99</Text>
      <View>
        <FlatList

        />
      </View>
      </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    marginTop:wp('2'),
    
  },
  imagebox: {
    
    backgroundColor: '#fff',
    width:wp('100'),
    height:wp('70'),
    alignSelf:'center'
    
  },
  image: {
    margin:wp('1'),
    flex:1,
    alignSelf:'center'
    
  },
  info: {
    top:-7,
    marginTop: 20,
    marginHorizontal:10,
    backgroundColor:'#fff',
    padding:10,
    borderRadius:5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#999',
    
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
};

export default Itemdetail;