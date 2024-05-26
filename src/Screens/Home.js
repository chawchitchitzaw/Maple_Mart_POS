import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import micky from '../Assets/micky.png';
import cartoon from '../Assets/cartoon.png';
import Panda from '../Assets/Panda.png';
import Searchbox from '../component/search/Searchbox';
import {TextInput} from 'react-native-gesture-handler';

export const data = [
  {id: 1, name: 'Micky', img: micky, price: '$200'},
  {id: 2, name: 'SpongeBob', img: cartoon, price: '$250'},
  {id: 3, name: 'Panda', img: Panda, price: '$500'},
  {id: 4, name: 'Micky', img: micky, price: '$200'},
];

const Home = () => {
  // const navigation = useNavigation();

  // useEffect(() => {
  //   console.log('test', Keyboard.isVisible());
  // }, []);

  const testRender = ({item}) => {
    return (
      <View style={styles.renderview}>
        <Image style={styles.renderimage} source={item.img} />
        <Text style={styles.caption}>{item.name}</Text>
        <Text style={styles.caption}>{item.price}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.sentences}>
              <Text style={{color: '#FF6D1A'}}>POS</Text> System
            </Text>
            <Searchbox />
          </View>

          <View style={styles.cardtitle}>
            <View>
              <Text style={styles.textidea}>Best Seller</Text>
            </View>
          </View>

          <View>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={data}
              keyExtractor={item => item.id.toString()}
              renderItem={testRender}
            />
          </View>

          <View style={styles.cardtitle}>
            <View>
              <Text style={styles.textidea}>Revenue</Text>
            </View>
          </View>
          <View style={styles.revenue}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.total}>Profile</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 10,
  },
  sentences: {
    fontSize: 30,
    fontFamily: 'DMSans',
    marginLeft: 30,
    marginBottom: 25,
    marginTop: 25,
    color: '#000000',
    fontWeight: 'bold',
  },
  cardtitle: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  textidea: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#4F4F4F',
  },
  caption: {
    fontSize: 15,
    marginLeft: 15,
    color: '#4F4F4F',
    fontWeight: 'bold',
  },
  renderview: {
    margin: 10,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    height: 250,
    borderRadius: 15,
    marginBottom: 25,
    width: 200,
  },
  renderimage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  total: {
    fontSize: 25,
    fontFamily: 'DMSans',
    marginLeft: 30,
    marginTop: 25,
    color: '#000000',
    fontWeight: 'bold',
  },
  revenue: {
    margin: 10,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    height: 150,
    borderRadius: 15,
    marginBottom: 10,
    width: 300,
  },
});
