// SearchScreen.js
import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text, TouchableOpacity,SafeAreaView,Image,Dimensions,ActivityIndicator } from 'react-native';import Icon from 'react-native-vector-icons/Ionicons';
import cola from '../Assets/cola.png';
import search_icon from '../Assets/search_icon.png';
import { useNavigation } from '@react-navigation/native';
import Searchbox from '../component/search/Searchbox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
const apidata='https://fakestoreapi.com/products';

const width = Dimensions.get('window').width-10;
const SearchScreen = () => {
  //API
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [items,setItems] = useState([]);
  

  useEffect(() => {
    fetchData(apidata);
  }, []);
  

  const fetchData = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  const handleSearch = text => {
    setSearchQuery(text);
    const filteredData = data.filter(item => item.title.toLowerCase().includes(text.toLowerCase())
    );
    setData(filteredData);
  };
  const uniqueItems = data.filter((item, index, self) =>
    index === self.findIndex((t) => t.category === item.category)
  );
  const testRender = ({item}) => {
    return(
     <TouchableOpacity style={styles.box}>
    <View>
      <Text style={styles.bar}> {item.category} </Text>
    </View>
    </TouchableOpacity>
    );
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Itemdetail')}>
      <Image source={{uri:item.image}} style={{width:wp('30'),height:hp('20'),alignSelf:'center',resizeMode:'contain'}}/>
      <Text style={styles.txtname} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.txtprice}>{item.price}</Text>
    </TouchableOpacity>
  );
  return (

    <View style={styles.container}>
      
        <View style={styles.search}>
          <Image source={search_icon} style={{height: 20, width: 20, marginRight:5}} />
          <TextInput
            style={styles.textsearch}
            placeholder="Search"
            value={searchQuery}
            onChangeText={text => handleSearch(text)}
          />
        </View>
        
        <View>
          <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={uniqueItems}
          keyExtractor={item=>item.id.toString()}
          renderItem={testRender}
          />
        </View>
        
        {loading ? (
        <ActivityIndicator size="large" color="#FF6D1A"  style={{flex:1, justifyContent:'center', alignItems:'center'}}/>
      ) : (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      )}
    </View>

  );
};

const styles = StyleSheet.create({
  // searchbar:{
  //   flexDirection: 'row',
  //   justifyContent:'space-between',
    
  // },
  bar:{
    fontFamily: 'DMSans',
    fontSize: 14,
    marginLeft: 5,
    color: '#4F4F4F',
    fontWeight: '600',
    margin:hp('.5'),
    padding:hp('.5'),
    
  },
  box:{
    justifyContent:'center',
    backgroundColor:'#fff',
    alignItems:'center',
    marginHorizontal:hp('.5'),
    marginVertical:hp('1'),
    //marginTop:-2,
    borderRadius:hp('20'),
    borderColor:'black',
    //flexDirection:'row',
    //height:hp('7'),
  },
  textsearch:{
    width:wp('50'),
  },
  category:{
    alignItems:'center',
    justifyContent:'center',
    width:wp('13%'),
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    
  },
  row: {
    //flex: 1,
    justifyContent: 'space-between',
  },
  item: {
    width: width / 2-10,
    borderRadius:hp('2'),
    backgroundColor: '#fff',
    padding: 5,
    //elevation: 1,
    marginVertical: 3,
    marginHorizontal: 3,
    
    
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


 
    search: {
      backgroundColor: '#FFFFFF',
      paddingVertical: 5,
      paddingHorizontal: 20,
      //marginHorizontal: 20,
      borderRadius: 25,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop:hp('1'),
      //width:wp('95%'),
      height:hp('7%'),
    },
    
  
});

export default SearchScreen;
