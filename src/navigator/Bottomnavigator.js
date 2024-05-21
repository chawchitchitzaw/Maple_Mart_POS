import {View, Text, StyleSheet, Settings} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Items from '../Screens/Items';
import Scan from '../Screens/Scan';
import Receipts from '../Screens/Receipts';
import Setting from '../Screens/Setting';
import Home from '../Screens/Home';
const Tab = createBottomTabNavigator();

const Bottomnavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#FF6D1A',
        tabBarInactiveTintColor: 'grey',
        height: 200,
        headerShown: false,
        tabBarHideOnKeyboard: true,
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
          tabBarStyle: {display: 'none'},
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
                <Ionicons name="scan" size={30} color={'#E3E3E3'} />
              </View>
              <Text style={{marginBottom: 0}}>Scan</Text>
            </View>
          ),

          tabBarLabel: '',
          tabBarShowLabel: true,
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
        name="Settings"
        component={Setting}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="settings" size={size} color={color} />
          ),
          tabBarLabel: 'Settings',
          tabBarShowLabel: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default Bottomnavigator;
const style = StyleSheet.create({});
