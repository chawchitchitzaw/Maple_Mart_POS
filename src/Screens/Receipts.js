import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  TextInput,
  Image,
} from 'react-native';
import React from 'react';
import search_icon from '../Assets/search_icon.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import moment from 'moment';
export const data = [
  {
    id: 1,
    barcode: '#2642456',
    price: '$20',
    date: '02-05-2024',
    time: '04:10 pm',
  },
  {
    id: 2,
    barcode: '#9766593',
    price: '$25',
    date: '02-05-2024',
    time: '04:12 pm',
  },
  {
    id: 3,
    barcode: '#7394293',
    price: '$25',
    date: '02-05-2024',
    time: '04:15 pm',
  },
  {
    id: 4,
    barcode: '#7569246',
    price: '$20',
    date: '05-05-2024',
    time: '02:10 pm',
  },
  {
    id: 5,
    barcode: '#2568721',
    price: '$20',
    date: '05-05-2024',
    time: '08:10 am',
  },
];
const select = [
  {label: '25/5/2024', value: '1'},
  {label: '26/5/2024', value: '2'},
];

const Receipts = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState(null);
  const [product, setProduct] = useState(data);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();
  const [openDateModal, setOpenDateModal] = useState(false);
  const [openTimeModal, setOpenTimeModal] = useState(false);

  const produceData = ({item}) => {
    return (
      <View style={styles.produceview}>
        {/* icon_and_price */}
        <View style={styles.flatbox}>
          <AntDesign name="creditcard" size={25} color={'#606F89'} />
          <View style={{marginLeft: wp('5%')}}>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        </View>

        <View style={{marginRight: wp('5%')}}>
          <Text style={styles.price}>{item.barcode}</Text>
        </View>
      </View>
    );
  };

  const handleSearch = () => {
    if (search == '#') {
      setProduct(data);
    } else {
      const filterProduct = data.filter(item => item.barcode == search);
      console.log('searValue', search);
      console.log('filter', filterProduct);
      setProduct(filterProduct);
    }
  };

  return (
    <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.secview}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#9C9C9C"
            value={search}
            onChangeText={setSearch}
            style={styles.txt}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Image source={search_icon} style={styles.img} />
          </TouchableOpacity>
        </View>

        <View style={styles.timedate}>
          <TouchableOpacity
            style={styles.timebox}
            onPress={() => setOpenDateModal(true)}>
            <Text style={styles.timetxt}>
              {moment(date).format('DD-MM-YY')}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={openDateModal}
            date={date}
            mode="date"
            onConfirm={e => {
              setOpenDateModal(false);
              setDate(e);
              setProduct(
                data.filter(
                  item => moment(e).format('DD-MM-YYYY') == item.date,
                ),
              );
            }}
            onCancel={() => {
              setOpenDateModal(false);
            }}
          />
          <TouchableOpacity
            style={styles.timebox}
            onPress={() => setOpenTimeModal(true)}>
            <Text style={styles.timetxt}>{moment(time).format('LTS')}</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={openTimeModal}
            date={new Date()}
            mode="time"
            onConfirm={e => {
              setOpenTimeModal(false);
              setTime(e);
              console.log('time test', moment(e).format('hh:mm a'));
              setProduct(
                product.filter(
                  item => moment(e).format('hh:mm a') >= item.time,
                ),
              );
            }}
            onCancel={() => {
              setOpenTimeModal(false);
            }}
          />
        </View>
        <View style={{marginTop: 10}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={product}
            keyExtractor={item => item.id.toString()}
            renderItem={produceData}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Receipts;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: wp('5%'),
  },
  price: {
    fontSize: hp('2.2%'),
    marginLeft: wp('3%'),
    color: '#606F89',
    fontWeight: '500',
    fontFamily: 'DMSans',
  },
  produceview: {
    marginVertical: hp('1%'),
    backgroundColor: '#FFFFFF',
    elevation: 1,
    borderRadius: hp('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('0.5%'),
  },
  date: {
    fontSize: hp('1.6%'),
    marginLeft: wp('3%'),
    color: '#606F89',
    fontWeight: '500',
    fontFamily: 'DMSans',
  },
  secview: {
    backgroundColor: '#FFFFFF',
    borderRadius: hp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    marginVertical: hp('2%'),
  },
  img: {
    height: hp('2.5%'),
    width: hp('2.5%'),
    marginHorizontal: wp('5%'),
  },
  txt: {
    fontWeight: '500',
    fontSize: hp('2.5%'),
    marginHorizontal: wp('5%'),
    fontFamily: 'DMSans',
    flex: 1,
  },
  timedate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: hp('1%'),
  },
  timebox: {
    borderRadius: hp('2%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    backgroundColor: '#FFFFFF',
    elevation: 1,
  },
  timetxt: {
    fontSize: hp('2.2%'),
    padding: wp('1%'),
    fontFamily: 'DMSans',
    fontWeight: '500',
  },
  flatbox: {flexDirection: 'row', alignItems: 'center', marginLeft: wp('5%')},
});
