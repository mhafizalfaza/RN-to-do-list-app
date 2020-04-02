import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoListViewScreen from './ToDoListViewScreen';
import AddToDoListScreen from './AddToDoListScreen';
import EditToDoListScreen from './EditToDoListScreen';

const Stack = createStackNavigator();

function ToDoListScreen() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="ToDoListView" component={ToDoListViewScreen} />
      <Stack.Screen name="AddToDoList" component={AddToDoListScreen} />
      <Stack.Screen name="EditToDoList" component={EditToDoListScreen} />
    </Stack.Navigator>
  );
}

export default ToDoListScreen;
