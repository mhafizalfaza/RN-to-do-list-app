import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ToDoListScreen from './ToDoListScreen';
import ProfileScreen from './ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import variables from '../utils/variables'

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'To Do List') {
          return <Icon name="list" size={30} color={focused ? variables.color.primary : 'grey'} />
        } else if (route.name === 'Profile') {
          return <Icon name="user" size={30} color={focused ? variables.color.primary : 'grey'} />
        }
      }
    })}

    tabBarOptions={{
      showLabel: false
    }}
    >
      <Tab.Screen name="To Do List" component={ToDoListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}