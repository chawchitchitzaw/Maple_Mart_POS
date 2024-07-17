import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import search_icon from '../Assets/search_icon.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Receipts = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [product, setProduct] = useState(data);
  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [openDateModal, setOpenDateModal] = useState(false);
  const [openEndDateModal, setOpenEndDateModal] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.user);
  const token = user.token;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const invoiceapi = await axios.get(
          'http://192.168.100.11/pos-backend/public/api/invoiceId',
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setData(invoiceapi.data[0]);
        setOriginalData(invoiceapi.data[0]); // Store the original data
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const produceData = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.produceview}
        onPress={() => navigation.navigate('InvoiceDetail', {productt: item})}>
        <AntDesign
          name="creditcard"
          size={25}
          color={'#606F89'}
          style={{marginHorizontal: wp('3%'), flex: 1}}
        />
        <View style={{marginHorizontal: wp('1%'), flex: 3}}>
          <Text style={styles.price}>{item.sub_total}</Text>
          <Text style={styles.date} numberOfLines={1}>
            {moment(item.updated_at).format('DD-MM-YYYY')}
          </Text>
        </View>
        <Text style={styles.bar}>{item.invoice_id}</Text>
      </TouchableOpacity>
    );
  };

  const handleSearch = () => {
    if (search === '') {
      setData(originalData); // Restore original data if search is cleared
    } else {
      const filterProduct = originalData.filter(
        // invoice => invoice.invoice_id.toLowerCase().includes(search.toLowerCase()) ,
        invoice => {
          const invoiceId = invoice.invoice_id.toLowerCase();
          const searchInv = search.toLowerCase();

          if (searchInv.includes('inv-')) {
            // If search contains "INV-", search the entire invoice_id
            return invoiceId.includes(searchInv);
          } else {
            // If search does not contain "INV-", search only the numeric part
            const invoiceNumber = invoiceId.replace('inv-', '');
            return invoiceNumber.includes(searchInv);
          }
        },
      );

      setData(filterProduct);
    }
  };

  // Effect hook to filter data when date or endDate changes
  useEffect(() => {
    filterData();
  }, [date, endDate]);

  useEffect(() => {
    setProduct(data);
  }, []);

  const filterData = () => {
    const filteredData = data.filter(item => {
      const itemDate = moment(item.updated_at, 'YYYY-MM-DD');

      return (
        itemDate.isSameOrAfter(moment(date).startOf('day')) &&
        itemDate.isSameOrBefore(moment(endDate).endOf('day'))
      );
    });

    setData(filteredData);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              {moment(date).format('DD-MM-YYYY')}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={openDateModal}
            date={date}
            mode="date"
            onConfirm={selectedDate => {
              setOpenDateModal(false);
              setDate(selectedDate);
            }}
            onCancel={() => setOpenDateModal(false)}
          />

          <TouchableOpacity
            style={styles.timebox}
            onPress={() => setOpenEndDateModal(true)}>
            <Text style={styles.timetxt}>
              {moment(endDate).format('DD-MM-YYYY')}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={openEndDateModal}
            date={endDate}
            mode="date"
            onConfirm={selectedDate => {
              setOpenEndDateModal(false);
              setEndDate(selectedDate);
            }}
            onCancel={() => setOpenEndDateModal(false)}
          />
        </View>

        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={produceData}
        />
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
    paddingTop: wp('-5'),
  },
  price: {
    fontSize: hp('2.2%'),
    //marginLeft: wp('3%'),
    color: '#606F89',
    fontWeight: '500',
    fontFamily: 'DMSans',
  },
  bar: {
    fontSize: hp('2.2%'),
    color: '#606F89',
    fontWeight: '500',
    fontFamily: 'DMSans',
    flex: 3,
    marginHorizontal: wp('2%'),
  },
  produceview: {
    marginVertical: hp('0.5%'),
    height: hp('7.5%'),
    backgroundColor: '#FFFFFF',
    elevation: 1,
    borderRadius: hp('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('0.5%'),
    flex: 7,
  },
  date: {
    fontSize: hp('1.6%'),
    //marginLeft: wp('3%'),
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
});
