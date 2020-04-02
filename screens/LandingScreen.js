import React, { useEffect, useContext } from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import { UserData } from '../contexts/userContext';

const Drawer = createDrawerNavigator();

export default ({ navigation }) => {

  const userData = useContext(UserData);

  useEffect(() => {
    if (!userData) navigation.navigate('Login')
  }, [userData])

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}