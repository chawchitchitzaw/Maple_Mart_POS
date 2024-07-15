import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Dimensions} from 'react-native';
const width = Dimensions.get('window').width - 20;
import {useSelector} from 'react-redux';
const baseUrl = 'http://192.168.100.11/pos-backend/public/api';
const img_url = 'http://192.168.100.11/pos-backend/public/storage/';

const Home = ({navigation}) => {
  const user = useSelector(state => state.user);
  const token = user.token;
  const [data, setData] = useState();
  const [sale, setSale] = useState();
  const [qty, setQty] = useState();
  useEffect(() => {
    fetchData();
    fetchSale();
  }, []);
  const fetchData = async () => {
    const resp = await axios.get(`${baseUrl}/bestSeller`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (resp.data['status'] === true) {
      setData(resp.data[0]);
    }
  };
  const fetchSale = async () => {
    const resp = await axios.get(`${baseUrl}/totalSaleQty`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });


    if (resp.data['status'] === 200) {
      setSale(resp.data['0'][0].total_sale);
      setQty(resp.data['1'][0].total_qty);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Image
        source={{uri: `${img_url}/${item.image}`}}
        style={{
          width: wp('30'),
          height: hp('25'),
          alignSelf: 'center',
          resizeMode: 'contain',
        }}
      />
      <Text style={styles.txtname} numberOfLines={2}>
        {item.product_name}
      </Text>
      <Text style={styles.txtprice}>{item.sell_price}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.lab}>
          <Text style={styles.sentences}>Maple Mart</Text>
        </View>

        <Text style={styles.textidea}>Revenue</Text>

        <View style={styles.revenuebox}>
          <View style={styles.revenue}>
            <Text style={styles.total}>Total Sale</Text>
            <Text style={{...styles.total, textAlign: 'center'}}>{sale}</Text>
          </View>
          <View style={styles.revenue}>
            <Text style={styles.total}>Total Qty</Text>
            <Text style={{...styles.total, textAlign: 'center'}}>{qty}</Text>
          </View>
        </View>
        <Text style={styles.textidea}>Best Seller</Text>

        <View style={{marginHorizontal: wp('2')}}>
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
    marginBottom: hp('2'),
  },
  lab: {
    backgroundColor: '#FFFFFF',
    padding: hp('1%'),
    paddingVertical: hp('2%'),
    alignItems: 'center',
    elevation: 1,
  },
  sentences: {
    fontSize: hp('3%'),
    fontFamily: 'DMSans',
    //marginHorizontal: wp('5%'),
    color: '#FF6D1A',
    fontWeight: '700',
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
    fontSize: hp('2.5%'),
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
    marginHorizontal: wp('2'),
  },
  item: {
    width: width / 2 - 10,
    //height:hp('30'),
    borderRadius: hp('2'),
    backgroundColor: '#fff',
    padding: 5,
    //elevation: 1,
    marginVertical: 3,
    marginHorizontal: 5,
  },
  txtname: {
    fontSize: 16,
    fontWeight: '650',
    marginLeft: 5,
  },
  txtprice: {
    fontSize: 12,
    marginLeft: 5,
  },
});
