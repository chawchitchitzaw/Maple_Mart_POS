// SearchScreen.js
import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text, TouchableOpacity,SafeAreaView,Image,Dimensions } from 'react-native';import Icon from 'react-native-vector-icons/Ionicons';
import cola from '../Assets/cola.png';
import search_icon from '../Assets/search_icon.png';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const data = [
  {id:1, barcode:'#123456789', name:'Coca Cola', price:'1500'},
  {id:2, barcode:'#123456798', name:'Pessi', price:'1500'},
  {id:3, barcode:'#123456779', name:'Cake', price:'2500'},
  {id:4, barcode:'#123456777', name:'asad', price:'2500'},
  {id:5, barcode:'#123456779', name:'iii', price:'2500'},
  {id:6, barcode:'#123456779', name:'hhh', price:'2500'},
  {id:7, barcode:'#123456779', name:'ggg', price:'2500'},
  {id:8, barcode:'#123456779', name:'fff', price:'2500'},
  {id:9, barcode:'#123456779', name:'eee', price:'2500'},
  {id:10, barcode:'#123456779', name:'ddd', price:'2500'},
  {id:11, barcode:'#123456779', name:'ccc', price:'2500'},
  {id:12, barcode:'#123456779', name:'bbb', price:'2500'},
  {id:13, barcode:'#123456779', name:'aaa', price:'2500'},
];

const width = Dimensions.get('window').width-10;
const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const newData = data.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Image source={cola} style={{width:150,height:180,alignSelf:'center'}}/>
      <Text style={styles.txtname}>{item.name}</Text>
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
            onChangeText={text => handleSearch(text)}
          />
        </View>
        <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('category')}>
        <View >
          <Text style={styles.txtcategory}>C</Text>
        </View>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredData}
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
    backgroundColor: '#FFFFFF',
      paddingVertical: 18,
      paddingHorizontal: 20,
      //marginHorizontal: 2,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      marginTop:10,
      fontWeight:'bold',
      //fontSize:'24',
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
    borderRadius:10,
    backgroundColor: '#fff',
    padding: 5,
    elevation: 1,
    marginVertical: 3,
    marginHorizontal: 3,
    //flex: 1,
    
  },
  txtname:{
    fontSize:16,
    fontWeight:'bold',
  },
   txtprice:{
    fontSize:12,
  },


 
    search: {
      backgroundColor: '#FFFFFF',
      paddingVertical: 5,
      paddingHorizontal: 20,
      //marginHorizontal: 20,
      borderRadius: 25,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical:hp('5'),
      width:wp('83%'),
    },
    textsearch: {
      fontWeight: 'bold',
      fontSize: 16,
      marginLeft: 20,
      fontFamily: 'DMSans',
    },
  
});

export default SearchScreen;
