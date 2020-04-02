import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import LandingScreen from './screens/LandingScreen';
import SignupScreen from './screens/SignupScreen';
import Context from './Context';

const Stack = createStackNavigator();

function App() {
  return (
    <Context>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerShown: false,
            gesturesEnabled: false,
          }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Landing" component={LandingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context>
  );
}

export default App;