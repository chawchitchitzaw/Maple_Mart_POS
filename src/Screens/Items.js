// SearchScreen.js
import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text, TouchableOpacity,SafeAreaView,Image,Dimensions } from 'react-native';import Icon from 'react-native-vector-icons/Ionicons';
import cola from '../Assets/cola.png';
import search_icon from '../Assets/search_icon.png';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
const apidata='https://fakestoreapi.com/products';

const width = Dimensions.get('window').width-10;
const SearchScreen = () => {
  //API
  const [data,setData] = useState([]);
  const [error,setError] = useState(null);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    fetchData(apidata);
  },[]);
  const fetchData = async(url) => {
    try {
    const response = await axios.get(url);
    
    setData(response.data);
    
        }catch(error){
          console.error(error);
          
        }
  }
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const newData = data.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
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
      <View style={styles.searchbar}>
        <View style={styles.search}>
          <Image source={search_icon} style={{height: 20, width: 20}} />
          <TextInput
            style={styles.textsearch}
            placeholder="Search"
            value={searchQuery}
            onChangeText={(query) => handleSearch(query)}
          />
        </View>
        <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('category')}>
        <View style={styles.txtcategory}>
          <Text style={{fontWeight:'900',fontSize:20}}>C</Text>
        </View>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  searchbar:{
    flexDirection: 'row',
    justifyContent:'space-between',
    
  },
  category:{
    alignItems:'center',
    justifyContent:'center',
    width:wp('13%'),
  },
  txtcategory:{
      backgroundColor: '#fff',
      borderRadius: 15,
      //marginHorizontal:hp('2.5'),
      paddingHorizontal:hp('2.5'),
      //paddingVertical:hp('4'),
      flexDirection: 'row',
      alignItems: 'center',
      //fontWeight:'bold',
      height:hp('8'),
      width:wp('12'),
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
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
    elevation: 1,
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
      marginVertical:hp('1'),
      width:wp('81.5%'),
      height:hp('8%'),
    },
    textsearch: {
      fontWeight: 'bold',
      fontSize: 16,
      marginLeft: 20,
      fontFamily: 'DMSans',
    },
  
});

export default SearchScreen;
