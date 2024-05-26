import {View, Text, TouchableOpacity, Image,StyleSheet} from 'react-native';
import React from 'react';
// import {useNavigation} from '@react-navigation/native';

const Card = ({tt}) => {
  // const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        key={tt.id}
        style={{
          height: 250,
          elevation: 2,
          backgroundColor: '#FFFFFF',
          marginLeft: 20,
          borderRadius: 15,
          marginBottom: 10,
          width: 200,
        }}>
        <Image
          style={{
            width: 200,
            height: 200,
            resizeMode: 'contain',
          }}
          source={tt.img}
        />
        <Text style={styles.textidea}>{tt.name}</Text>
        <Text style={styles.textidea}>{tt.price}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Card;
const styles = StyleSheet.create({

  textidea: {
    fontSize: 15,
    marginLeft:15,
    color: '#4F4F4F',
  },
});

