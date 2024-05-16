import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
  const navigation = useNavigation()
  return (
    <View>
      <Text>Home</Text>

      <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
        <Text>Go to login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home