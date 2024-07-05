import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text, TouchableOpacity,SafeAreaView,Image,Dimensions,ActivityIndicator,KeyboardAvoidingView,TouchableWithoutFeedback } from 'react-native';import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import {useSelector} from 'react-redux';

//import Searchbox from '../component/search/Searchbox';

const width = Dimensions.get('window').width-10;
const baseUrl = 'http://192.168.100.11/pos-backend/public/api';

const Items = ({navigation}) => {
  const imageUrl = 'http://192.168.100.11/pos-backend/public/storage/';
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user);
  const token = user.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get(`${baseUrl}/category/getCategoryData`,{
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const productResponse = await axios.get(`${baseUrl}/product/getProductData`,{
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        setCategories(categoryResponse.data[0]);
        setProducts(productResponse.data[0]);
        setFilteredProducts(productResponse.data[0]);
        // console.log('aaaaaaaaaaaaaaaaaa',productResponse.data[0]);
        // console.log('bbbbbbbbbbbbbbbbbb',categoryResponse.data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchQuery, products]);

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category_name === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6D1A" />
      </View>
    );
  }
  const CategorySelector = ({ categories, selectedCategory, setSelectedCategory }) => (
    <View style={styles.categorySelector}>
      
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedCategory(item.name)}
            style={[
              styles.categoryButton,
              { backgroundColor: selectedCategory === item.name ? '#FF6D1A' : '#fff',
                
               },
            ]}
          >
            <Text style={[styles.categoryButtonText,{color: selectedCategory === item.name ? '#fff' : '#000000'}]}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const SearchBox = ({ searchQuery, setSearchQuery }) => (
    <KeyboardAvoidingView behavior={'position'}>
        <TouchableWithoutFeedback onPress={TextInput.dismiss}>
          <View style={styles.container1}>
            <TextInput
              placeholder="Search"
              placeholderTextColor="#9C9C9C"
              style={styles.txt1}
              value={searchQuery}
              onChangeText={setSearchQuery}
  
            />
            <Image
              source={require('../Assets/search_icon.png')}
              style={styles.img1}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );

  const ProductList = ({ products }) => (
    <View style={{marginBottom:hp('18')}}>
    <FlatList
      showsVerticalScrollIndicator={false}
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Itemdetail', { product: item })}>
        <Image source={{uri: `${imageUrl}/${item.image}`}} style={{width:wp('30'),height:hp('20'),alignSelf:'center',resizeMode:'contain'}}/>
        <Text style={styles.txtname} numberOfLines={2}>{item.product_name}</Text>
        <Text style={styles.txtprice}>{item.sell_price}</Text>
        </TouchableOpacity>
      )}
      numColumns={2}
      columnWrapperStyle={styles.row}
    />
    </View>
  );


  return (
    <SafeAreaView style={styles.container}>
  
     
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
    
      <View style={styles.container2}>
        <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      
      <ProductList products={filteredProducts} />
      </View>
    </SafeAreaView>
  );
};







const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: wp('7%'),
    //paddingHorizontal:wp('5'),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categorySelector: {
    
  },
  row: {
    //flex: 1,
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
  },
  categoryButton: {
    
    padding: wp('2'),
    marginHorizontal: wp('1'),
    marginVertical: wp('1'),
    borderRadius:wp('20'),
    elevation:1,
  },
  categoryButtonText: {
    //color: 'white',
  },
  
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  container1: {
    //flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: wp('0.5%'),
    marginHorizontal: wp('5%'),
    borderRadius: hp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
  },
  img1: {
    height: hp('2.5%'),
    width: hp('2.5%'),
    marginHorizontal: wp('5%'),
  },
  txt1: {
    fontWeight: '500',
    fontSize: hp('2.5%'),
    marginHorizontal: wp('5%'),
    fontFamily: 'DMSans',
  },
  container2:{
    marginTop:hp('1'),
    paddingHorizontal:wp('5'),
  },
  item: {
    width: width / 2-wp('5'),
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
});

export default Items;
