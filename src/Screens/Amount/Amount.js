import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Back from '../../component/Back/Back';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SelectCountry} from 'react-native-element-dropdown';
import CashBtn from '../../component/Product/CashBtn';

const local_data = [
  {
    value: '1',
    lable: 'Cash',
  },
  {
    value: '2',
    lable: 'Card',
  },
];

const Amount = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState();
  const [pay, setPay] = useState('1');
  return (
    <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back />
        </TouchableOpacity>
        <View style={styles.amountlist}>
          <Text style={styles.besidebox}>Total</Text>

          <TextInput
            placeholder="Enter Amont"
            placeholderTextColor="#9C9C9C"
            style={styles.inputtxt}
            value={value}
            onChangeText={val => setValue(val)}
          />
        </View>
        <View style={styles.amountlist}>
          <Text style={styles.besidebox}>Discount</Text>

          <TextInput
            placeholder="Enter Amont"
            placeholderTextColor="#9C9C9C"
            style={styles.inputtxt}
            value={value}
            onChangeText={val => setValue(val)}
          />
        </View>
        <View style={styles.amountlist}>
          <Text style={styles.besidebox}>Net Total</Text>

          <TextInput
            placeholder="Enter Amont"
            placeholderTextColor="#9C9C9C"
            style={styles.inputtxt}
            value={value}
            onChangeText={val => setValue(val)}
          />
        </View>
        <View style={styles.amountlist}>
          <Text style={styles.besidebox}>Cash Received</Text>

          <TextInput
            placeholder="Enter Amont"
            placeholderTextColor="#9C9C9C"
            style={styles.inputtxt}
            value={value}
            onChangeText={val => setValue(val)}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <SelectCountry
            style={styles.dropdown}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            value={pay}
            data={local_data}
            valueField="value"
            labelField="lable"
            placeholder="Payment"
            onChange={e => {
              setPay(e.value);
            }}
          />
        </View>
        <View>
          <CashBtn lable="PAY BILL" goto="Checkout" />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Amount;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: wp('5%'),
  },
  amountlist: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('1%'),
    marginVertical: hp('1%'),
  },
  inputtxt: {
    fontWeight: '500',
    fontSize: hp('2.2%'),
    fontFamily: 'DMSans',
    backgroundColor: '#FFFFFF',
    borderRadius: hp('1%'),
    elevation: 1,
    flex: 1,
    paddingHorizontal: wp('5%'),
    height: hp('6.5%'),
    flex: 2,
  },
  besidebox: {
    color: '#606F89',
    fontWeight: '500',
    fontSize: hp('2.2%'),
    fontFamily: 'DMSans',
    marginVertical: hp('1%'),
    marginRight: wp('2%'),
    flex: 2,
  },

  dropdown: {
    margin: hp('5%'),
    height: wp('15%'),
    width: wp('50%'),
    backgroundColor: '#FFFFFF',
    borderRadius: hp('2%'),
    paddingHorizontal: wp('3%'),
  },

  placeholderStyle: {
    fontSize: hp('2.2%'),
  },
  selectedTextStyle: {
    fontWeight: '500',
    fontSize: hp('2.2%'),
    fontFamily: 'DMSans',
    color: '#9C9C9C',
    marginLeft: wp('3%'),
  },
});
