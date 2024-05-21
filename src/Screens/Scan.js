import {View, Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const Scan = () => {
  const navigation = useNavigation();
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Text>cafdg5yujf</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Go to login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Scan;
