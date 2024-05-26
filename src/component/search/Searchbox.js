import React from 'react';
import {
  TextInput,
  Image,
  KeyboardAvoidingView,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import search_icon from '../../Assets/search_icon.png';
const Searchbox = () => {
  return (
    <KeyboardAvoidingView
      // style={{flex: 1}}
      behavior={'position'}>
      <TouchableWithoutFeedback onPress={TextInput.dismiss}>
        <View style={styles.search}>
          <Image source={search_icon} style={{height: 20, width: 20}} />
          <View style={{flex: 1}}>
            <TextInput
              placeholder="Search"
              placeholderTextColor="#9C9C9C"
              style={styles.textsearch}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Searchbox;
const styles = StyleSheet.create({
  search: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  textsearch: {
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 20,
    fontFamily: 'DMSans',
  },
});
