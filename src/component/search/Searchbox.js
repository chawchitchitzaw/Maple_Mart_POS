import React from 'react';
import {
  TextInput,
  Image,
  KeyboardAvoidingView,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Searchbox = () => {
  return (
    <KeyboardAvoidingView behavior={'position'}>
      <TouchableWithoutFeedback onPress={TextInput.dismiss}>
        <View style={styles.container}>
          <Image
            source={require('../../Assets/search_icon.png')}
            style={styles.img}
          />
          <View style={{flex: 1}}>
            <TextInput
              placeholder="Search"
              placeholderTextColor="#9C9C9C"
              style={styles.txt}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Searchbox;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: wp('0.5%'),
    marginHorizontal: wp('5%'),
    borderRadius: hp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  img: {
    height: hp('2.5%'),
    width: hp('2.5%'),
    marginHorizontal: wp('5%'),
  },
  txt: {
    fontWeight: '500',
    fontSize: hp('2.5%'),
    marginHorizontal: wp('1%'),
    fontFamily: 'DMSans',
  },
});
