import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Receipts from '../Screens/Receipts';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Items from '../Screens/Items';
import Profile from '../Screens/Profile/Profile';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Scan from '../Screens/Scan';
import Home from '../Screens/Home';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();

const Bottomnavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#FF6D1A',
        tabBarInactiveTintColor: 'grey',
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: hp('8%'),
          paddingBottom: hp('1%'),
        },
        tabBarLabelStyle: {
          fontSize: hp('1.5%'),
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Octicons name="home" size={size} color={color} />
          ),
          tabBarShowLabel: true,
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Items"
        component={Items}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="box" size={size} color={color} />
          ),
          tabBarShowLabel: true,
          tabBarLabel: 'Items',
        }}
      />
      <Tab.Screen
        name="Scan"
        component={Scan}
        options={{
          tabBarIcon: () => (
            <View
              style={{
                top: -20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  padding: 10,
                  height: 50,
                  backgroundColor: '#FF6D1A',
                  borderRadius: 30,
                }}>
                <Ionicons name="scan" size={30} color={'#fff'} />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Receipts"
        component={Receipts}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="receipt" size={size} color={color} />
          ),
          tabBarShowLabel: true,
          tabBarLabel: 'Receipts',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="user" size={size} color={color} />
          ),
          tabBarLabel: 'Profile',
          tabBarShowLabel: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default Bottomnavigator;
const style = StyleSheet.create({});
