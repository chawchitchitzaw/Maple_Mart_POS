import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Back from '../../component/Back/Back';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Items = () => {
  const navigation = useNavigation();
  const [product, setProduct] = useState(data);

  const testRender = ({item}) => {
    return (
      <TouchableOpacity>
        <View style={styles.box}>
          <View>
            <Text style={styles.bar}> {item.barcode} </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View >
        <Back lable={'Categories'} />

        <View>
          <View style={styles.topflat}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={product}
              keyExtractor={item => item.id.toString()}
              renderItem={testRender}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Items;

const styles = StyleSheet.create({
  box: {
    marginHorizontal: wp('5'),
    marginBottom: wp('1.5'),
    backgroundColor: '#FFFFFF',
    elevation: 1,
    borderRadius: hp('2'),
    padding: 15,
    height: hp('7'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bar: {
    fontFamily: 'DMSans',
    fontSize: 14,
    marginLeft: 5,
    color: '#4F4F4F',
    fontWeight: 'bold',
  },
  topflat: {
    marginTop: 20,
  },
});
