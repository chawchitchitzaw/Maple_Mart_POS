import {View, Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Back from '../component/Back/Back';


const Scan = () => {
    
     
  const navigation = useNavigation();
  return (
    <View>
        <Back/>
      <Text>Hello Scanner</Text>
    </View>
  );
};

export default Scan;
